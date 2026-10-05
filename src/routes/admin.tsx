import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { Session } from "@supabase/supabase-js";
import { ShieldCheck, LoaderCircle, LogOut, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSiteAuth } from "@/lib/site-auth";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({ meta: [
    { title: "Operations Console | Zentramed Health" },
    { name: "description", content: "Secure staff sign-in for the Zentramed Health operations console." },
    { property: "og:title", content: "Zentramed Health Operations Console" },
    { property: "og:description", content: "Secure access for Zentramed Health staff." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex, nofollow" },
  ] }),
  component: AdminPage,
});

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    const client = getSiteAuth();
    const { data: { subscription } } = client.auth.onAuthStateChange((_event, next) => {
      if (active) { setSession(next); setChecking(false); }
    });
    client.auth.getSession().then(({ data, error: sessionError }) => {
      if (active) { setSession(data.session); setChecking(false); if (sessionError) setError(sessionError.message); }
    }).catch(() => { if (active) { setChecking(false); setError("The sign-in service did not respond. Please try again."); } });
    return () => { active = false; subscription.unsubscribe(); };
  }, []);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy || checking) return;
    setBusy(true); setError("");
    try {
      const { data, error: authError } = await getSiteAuth().auth.signInWithPassword({ email: email.trim().toLowerCase(), password });
      if (authError) { setError(authError.message); return; }
      if (!data.session) { setError("Sign-in finished without a session. Please try again."); return; }
      setSession(data.session); setPassword("");
    } catch { setError("The sign-in service did not respond. Please try again."); }
    finally { setBusy(false); }
  }

  async function signOut() {
    setBusy(true); setError("");
    try {
      await queryClient.cancelQueries(); queryClient.clear();
      const { error: signOutError } = await getSiteAuth().auth.signOut();
      if (signOutError) { setError(signOutError.message); return; }
      setSession(null); await navigate({ to: "/admin", replace: true });
    } catch { setError("Sign-out did not finish. Please try again."); }
    finally { setBusy(false); }
  }

  return (
    <main className="admin-theme relative flex min-h-screen items-center justify-center bg-admin-background px-5 py-12 text-admin-foreground">
      <div className="relative w-full max-w-[430px]">
        <div className="mb-9 flex flex-col items-center text-center">
          <img src="/logo-wide.png" alt="Zentramed Health" className="h-14 w-auto max-w-full object-contain brightness-0 invert" />
          <h1 className="mt-7 font-display text-2xl font-bold uppercase">Zentramed</h1>
          <p className="mt-2 font-mono text-[10px] uppercase text-admin-muted">Operations Console</p>
        </div>
        {checking ? <div className="flex justify-center py-16" role="status" aria-label="Checking session"><LoaderCircle className="h-7 w-7 animate-spin text-admin-accent" /></div> : session ? (
          <section className="rounded-lg border border-admin-border bg-admin-surface p-7 shadow-[var(--shadow-admin)] sm:p-8">
            <ShieldCheck className="h-7 w-7 text-admin-accent" />
            <h2 className="mt-4 text-xl font-semibold">Signed in securely</h2>
            <p className="mt-2 break-all text-sm text-admin-muted">{session.user.email}</p>
            <div className="mt-6 grid gap-3">
              <Button asChild className="bg-admin-foreground text-admin-background hover:bg-admin-accent"><a href="https://zentramedhealth.co.ke/admin">Open live operations console <ArrowUpRight /></a></Button>
              <Button variant="outline" className="border-admin-border bg-admin-surface text-admin-foreground hover:bg-admin-background hover:text-admin-foreground" onClick={signOut} disabled={busy}><LogOut /> Sign out</Button>
            </div>
            {error && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}
          </section>
        ) : (
          <form onSubmit={signIn} className="rounded-lg border border-admin-border bg-admin-surface p-7 shadow-[var(--shadow-admin)] sm:p-8">
            <div className="mb-7 flex items-center justify-between border-b border-admin-border pb-5">
              <div><p className="font-mono text-[10px] uppercase text-admin-accent">Secure access</p><h2 className="mt-1 text-lg font-semibold">Sign in to continue</h2></div>
              <ShieldCheck className="h-6 w-6 text-admin-accent" />
            </div>
            <div className="space-y-5">
              <div><label htmlFor="admin-email" className="font-mono text-[10px] uppercase text-admin-muted">Work email</label><Input id="admin-email" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@zentramedhealth.co.ke" className="mt-2 h-12 border-admin-border bg-admin-background text-admin-foreground placeholder:text-admin-muted/50 focus-visible:ring-admin-accent" /></div>
              <div><label htmlFor="admin-password" className="font-mono text-[10px] uppercase text-admin-muted">Password</label><Input id="admin-password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="mt-2 h-12 border-admin-border bg-admin-background text-admin-foreground placeholder:text-admin-muted/50 focus-visible:ring-admin-accent" /></div>
              {error && <div role="alert" className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-sm text-destructive">{error}</div>}
              <Button type="submit" disabled={busy} className="h-12 w-full bg-admin-foreground font-mono text-xs font-semibold uppercase text-admin-background hover:bg-admin-accent">{busy && <LoaderCircle className="h-4 w-4 animate-spin" />} {busy ? "Signing in…" : "Sign in securely"}</Button>
            </div>
          </form>
        )}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3 font-mono text-[9px] uppercase text-admin-muted"><span className="h-1.5 w-1.5 rounded-full bg-admin-success" /><span>Secure system online</span><span className="h-3 w-px bg-admin-border" /><Link to="/" className="hover:text-admin-accent">Return to website</Link></div>
      </div>
    </main>
  );
}