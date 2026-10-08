import { OptimizedImage } from "@/components/optimized-image";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Session } from "@supabase/supabase-js";
import { ShieldCheck, LoaderCircle, LogOut, Plus, Trash2, Save, Upload, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { CATEGORIES, allProducts, formatKES } from "@/data/catalogue";
import { fetchDbProducts, productsQueryKey, type DbProduct } from "@/lib/live-catalogue";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({ meta: [
    { title: "Operations Console | Zentramed Health" },
    { name: "description", content: "Secure staff sign-in to manage Zentramed Health products, photos and prices." },
    { property: "og:title", content: "Zentramed Health Operations Console" },
    { property: "og:description", content: "Secure access for Zentramed Health staff." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex, nofollow" },
  ] }),
  component: AdminPage,
});

const db = supabase as any;

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, next) => { setSession(next); setChecking(false); });
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setChecking(false); });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) { setIsAdmin(null); return; }
    db.rpc("claim_first_admin").then(({ data }: { data: boolean }) => setIsAdmin(!!data));
  }, [session?.user.id]);

  return (
    <main className="admin-theme min-h-screen bg-admin-background px-4 py-10 text-admin-foreground">
      <div className="mx-auto flex flex-col items-center text-center">
        <OptimizedImage src="/logo-wide.png" alt="Zentramed Health" className="h-12 w-auto object-contain brightness-0 invert" />
        <p className="mt-3 font-mono text-[10px] uppercase text-admin-muted">Operations Console</p>
      </div>
      <div className="mt-8">
        {checking ? <Spinner /> : !session ? <SignIn /> : isAdmin === null ? <Spinner /> : !isAdmin ? (
          <Card><p className="text-sm">Signed in as {session.user.email}, but this account is not an admin.</p><SignOutButton /></Card>
        ) : <Manager email={session.user.email ?? ""} />}
      </div>
      <div className="mt-8 text-center font-mono text-[10px] uppercase text-admin-muted"><Link to="/" className="hover:text-admin-accent">Return to website</Link></div>
    </main>
  );
}

const Spinner = () => <div className="flex justify-center py-16"><LoaderCircle className="h-7 w-7 animate-spin text-admin-accent" /></div>;
const Card = ({ children }: { children: React.ReactNode }) => <section className="mx-auto max-w-[430px] space-y-4 rounded-lg border border-admin-border bg-admin-surface p-7 shadow-[var(--shadow-admin)]">{children}</section>;
const field = "h-10 border-admin-border bg-admin-background text-admin-foreground";

function SignOutButton() {
  const qc = useQueryClient();
  return <Button variant="outline" className="border-admin-border bg-admin-surface text-admin-foreground" onClick={async () => { await qc.cancelQueries(); await supabase.auth.signOut(); qc.invalidateQueries(); }}><LogOut /> Sign out</Button>;
}

function SignIn() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false); const [msg, setMsg] = useState("");
  async function submit(e: FormEvent) {
    e.preventDefault(); setBusy(true); setMsg("");
    const creds = { email: email.trim().toLowerCase(), password };
    const { data, error } = mode === "in" ? await supabase.auth.signInWithPassword(creds) : await supabase.auth.signUp({ ...creds, options: { emailRedirectTo: `${window.location.origin}/admin` } });
    if (error) setMsg(error.message); else if (mode === "up" && !data.session) setMsg("Account created. Check your email to confirm, then sign in.");
    setBusy(false);
  }
  return (
    <form onSubmit={submit}><Card>
      <div className="flex items-center justify-between"><h2 className="text-lg font-semibold">{mode === "in" ? "Sign in to continue" : "Create staff account"}</h2><ShieldCheck className="h-6 w-6 text-admin-accent" /></div>
      <Input type="email" required placeholder="Work email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className={field} />
      <Input type="password" required minLength={6} placeholder="Password" autoComplete={mode === "in" ? "current-password" : "new-password"} value={password} onChange={(e) => setPassword(e.target.value)} className={field} />
      {msg && <p role="alert" className="text-sm text-destructive">{msg}</p>}
      <Button type="submit" disabled={busy} className="w-full bg-admin-foreground text-admin-background hover:bg-admin-accent">{busy && <LoaderCircle className="animate-spin" />}{mode === "in" ? "Sign in" : "Create account"}</Button>
      <button type="button" onClick={() => setMode(mode === "in" ? "up" : "in")} className="w-full text-xs text-admin-muted hover:text-admin-accent">{mode === "in" ? "First time? Create the admin account" : "Have an account? Sign in"}</button>
    </Card></form>
  );
}

async function uploadPhoto(file: File): Promise<string> {
  const path = `${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
  const { error } = await supabase.storage.from("product-images").upload(path, file, { contentType: file.type });
  if (error) throw error;
  const { data, error: e2 } = await supabase.storage.from("product-images").createSignedUrl(path, 60 * 60 * 24 * 365 * 20);
  if (e2 || !data) throw e2 ?? new Error("Could not get photo link");
  return data.signedUrl;
}

function Manager({ email }: { email: string }) {
  const qc = useQueryClient();
  const { data: rows = [], isLoading } = useQuery({ queryKey: productsQueryKey, queryFn: fetchDbProducts });
  const [cat, setCat] = useState(CATEGORIES[0].slug);
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const refresh = () => qc.invalidateQueries({ queryKey: productsQueryKey });

  async function importCatalogue() {
    setBusy(true); setMsg("");
    const list = allProducts().map((p, i) => ({ category_slug: p.categorySlug, subcategory: p.subcategory, name: p.name, price: p.price, reseller: p.reseller ?? null, image_url: p.image ?? null, sort_order: i }));
    const { error } = await db.from("products").insert(list);
    setMsg(error ? error.message : `Imported ${list.length} products.`); setBusy(false); refresh();
  }

  const shown = useMemo(() => rows.filter((r) => (search ? r.name.toLowerCase().includes(search.toLowerCase()) : r.category_slug === cat)), [rows, cat, search]);
  const subs = CATEGORIES.find((c) => c.slug === cat)?.subcategories.map((s) => s.name) ?? [];

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-admin-border bg-admin-surface p-4">
        <p className="text-sm">Signed in as <b>{email}</b></p><SignOutButton />
      </div>
      {isLoading ? <Spinner /> : rows.length === 0 ? (
        <Card><p className="text-sm">No products saved yet. Load the current website catalogue so you can start editing.</p>
          <Button onClick={importCatalogue} disabled={busy} className="w-full bg-admin-foreground text-admin-background hover:bg-admin-accent"><Database /> Load current catalogue</Button>{msg && <p className="text-sm">{msg}</p>}</Card>
      ) : (
        <>
          <div className="flex flex-wrap gap-3">
            <select value={cat} onChange={(e) => { setCat(e.target.value); setSearch(""); }} className={`${field} rounded-md border px-3`}>
              {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
            </select>
            <Input placeholder="Search all products…" value={search} onChange={(e) => setSearch(e.target.value)} className={`${field} max-w-xs`} />
          </div>
          {!search && <NewProduct cat={cat} subs={subs} onDone={refresh} />}
          <div className="space-y-2">{shown.map((r) => <Row key={r.id} row={r} onDone={refresh} />)}</div>
          {shown.length === 0 && <p className="text-sm text-admin-muted">No products here.</p>}
        </>
      )}
    </div>
  );
}

function PhotoPicker({ url, onChange }: { url: string | null; onChange: (u: string) => void }) {
  const [busy, setBusy] = useState(false);
  return (
    <label className="relative grid h-16 w-16 shrink-0 cursor-pointer place-items-center overflow-hidden rounded border border-admin-border bg-white" title="Change photo">
      {url ? <OptimizedImage src={url} alt="" className="h-full w-full object-contain" /> : <Upload className="h-5 w-5 text-admin-muted" />}
      {busy && <span className="absolute inset-0 grid place-items-center bg-admin-background/70"><LoaderCircle className="h-5 w-5 animate-spin" /></span>}
      <input type="file" accept="image/*" className="hidden" onChange={async (e) => { const f = e.target.files?.[0]; if (!f) return; setBusy(true); try { onChange(await uploadPhoto(f)); } catch (err: any) { alert(err.message); } setBusy(false); }} />
    </label>
  );
}

function Row({ row, onDone }: { row: DbProduct; onDone: () => void }) {
  const [v, setV] = useState(row);
  const [busy, setBusy] = useState(false);
  useEffect(() => setV(row), [row]);
  const dirty = JSON.stringify(v) !== JSON.stringify(row);
  async function save(next = v) {
    setBusy(true);
    const { error } = await db.from("products").update({ name: next.name, price: next.price, reseller: next.reseller, image_url: next.image_url, subcategory: next.subcategory }).eq("id", row.id);
    setBusy(false); if (error) alert(error.message); else onDone();
  }
  async function remove() {
    if (!confirm(`Delete "${row.name}"?`)) return;
    const { error } = await db.from("products").delete().eq("id", row.id);
    if (error) alert(error.message); else onDone();
  }
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border border-admin-border bg-admin-surface p-3">
      <PhotoPicker url={v.image_url} onChange={(u) => { const n = { ...v, image_url: u }; setV(n); save(n); }} />
      <div className="min-w-[200px] flex-1 space-y-1">
        <Input value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} className={field} aria-label="Product name" />
        <Input value={v.subcategory} onChange={(e) => setV({ ...v, subcategory: e.target.value })} className={`${field} h-8 text-xs`} aria-label="Subcategory" />
      </div>
      <label className="text-xs text-admin-muted">Price (KES)<Input type="number" min={0} value={v.price} onChange={(e) => setV({ ...v, price: Number(e.target.value) })} className={`${field} w-28`} /></label>
      <label className="text-xs text-admin-muted">Reseller<Input type="number" min={0} value={v.reseller ?? ""} onChange={(e) => setV({ ...v, reseller: e.target.value === "" ? null : Number(e.target.value) })} className={`${field} w-28`} /></label>
      <div className="flex gap-2">
        <Button size="icon" disabled={!dirty || busy} onClick={() => save()} className="bg-admin-foreground text-admin-background hover:bg-admin-accent" aria-label="Save">{busy ? <LoaderCircle className="animate-spin" /> : <Save />}</Button>
        <Button size="icon" variant="destructive" onClick={remove} aria-label="Delete"><Trash2 /></Button>
      </div>
      <span className="w-full text-xs text-admin-muted sm:hidden">{formatKES(v.price)}</span>
    </div>
  );
}

function NewProduct({ cat, subs, onDone }: { cat: string; subs: string[]; onDone: () => void }) {
  const empty = { name: "", subcategory: subs[0] ?? "", price: 0, reseller: null as number | null, image_url: null as string | null };
  const [v, setV] = useState(empty);
  const [busy, setBusy] = useState(false);
  useEffect(() => setV({ ...empty, subcategory: subs[0] ?? "" }), [cat]);
  async function add(e: FormEvent) {
    e.preventDefault(); setBusy(true);
    const { error } = await db.from("products").insert({ ...v, category_slug: cat, sort_order: Date.now() % 1e9 });
    setBusy(false); if (error) alert(error.message); else { setV({ ...empty, subcategory: v.subcategory }); onDone(); }
  }
  return (
    <form onSubmit={add} className="flex flex-wrap items-end gap-3 rounded-lg border border-dashed border-admin-accent bg-admin-surface p-3">
      <PhotoPicker url={v.image_url} onChange={(u) => setV({ ...v, image_url: u })} />
      <label className="min-w-[180px] flex-1 text-xs text-admin-muted">New product name<Input required value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} className={field} /></label>
      <label className="text-xs text-admin-muted">Subcategory<Input required list="subs" value={v.subcategory} onChange={(e) => setV({ ...v, subcategory: e.target.value })} className={`${field} w-44`} /><datalist id="subs">{subs.map((s) => <option key={s} value={s} />)}</datalist></label>
      <label className="text-xs text-admin-muted">Price (KES)<Input type="number" min={0} required value={v.price} onChange={(e) => setV({ ...v, price: Number(e.target.value) })} className={`${field} w-28`} /></label>
      <label className="text-xs text-admin-muted">Reseller<Input type="number" min={0} value={v.reseller ?? ""} onChange={(e) => setV({ ...v, reseller: e.target.value === "" ? null : Number(e.target.value) })} className={`${field} w-28`} /></label>
      <Button type="submit" disabled={busy} className="bg-admin-foreground text-admin-background hover:bg-admin-accent"><Plus /> Add</Button>
    </form>
  );
}
