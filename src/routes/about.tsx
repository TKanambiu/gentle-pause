import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import aboutAsset from "@/assets/site/about-clinical.jpg.asset.json";
import { Button } from "@/components/ui/button";
import { ShieldCheck, HeartPulse, Truck, Globe, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Zentramed Health Nairobi" },
      { name: "description", content: "Learn about Zentramed Health — a trusted African supplier of medical equipment, laboratory diagnostics and humanitarian healthcare solutions." },
      { property: "og:title", content: "About Zentramed Health" },
      { property: "og:description", content: "Trusted supplier of medical supplies and equipment across Africa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const standards = [
    { icon: ShieldCheck, title: "Quality assured", body: "Certified, approved products sourced from trusted global manufacturers." },
    { icon: HeartPulse, title: "Clinically focused", body: "Solutions selected around the practical needs of care teams and facilities." },
    { icon: Truck, title: "Dependable delivery", body: "Secure, coordinated fulfilment for institutions and programmes across the region." },
    { icon: Globe, title: "Regional reach", body: "Local expertise in Nairobi with the capability to support partners across Africa." },
  ];
  return (
    <div>
      <SiteHeader />
      <section className="relative overflow-hidden bg-topbar text-topbar-foreground">
        <div className="absolute inset-y-0 right-0 hidden w-1/3 border-l border-brand/30 bg-brand/10 lg:block" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-8">
            <p className="flex items-center gap-3 font-mono text-[10px] font-bold uppercase text-brand"><span className="h-px w-8 bg-brand" /> About Zentramed Health</p>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-5xl">Better healthcare begins with dependable supply.</h1>
            <p className="mt-5 max-w-2xl border-l-2 border-brand pl-5 text-sm leading-7 text-topbar-foreground/70 sm:text-base">We connect hospitals, clinics, NGOs and public institutions with the medical products, equipment and support they need to deliver care with confidence.</p>
          </div>
          <div className="border-y border-brand/40 py-6 lg:col-span-3 lg:col-start-10">
            <p className="font-mono text-[10px] uppercase">Our purpose</p>
            <p className="mt-3 font-display text-lg font-semibold leading-snug">Advancing healthcare and humanitarian solutions across Africa.</p>
          </div>
        </div>
      </section>
      <section className="py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:gap-16">
          <div className="relative border border-brand/30 p-2 sm:p-3">
            <img src={aboutAsset.url} alt="Healthcare professional preparing clinical instruments" className="aspect-[4/3] w-full object-cover shadow-xl" loading="lazy" />
            <div className="absolute bottom-0 right-0 max-w-52 bg-brand px-6 py-5 text-brand-foreground shadow-xl">
              <p className="font-display text-3xl font-bold">500+</p><p className="mt-1 text-xs font-semibold uppercase">Products stocked</p>
            </div>
          </div>
          <div>
            <p className="flex items-center gap-3 font-mono text-[10px] font-bold uppercase text-brand"><span className="h-px w-8 bg-brand" /> Who we are / What we stand for</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl">A committed partner to every care environment.</h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground">Zentramed Health is a trusted supplier of high-quality medical supplies, equipment and solutions. From wound care and diagnostics to oxygen therapy and hospital furniture, we deliver the breadth healthcare facilities need to operate effectively.</p>
            <div className="mt-6 border-y border-border py-5">
              <p className="font-mono text-[10px] font-bold uppercase text-brand">Our mission</p>
              <p className="mt-3 font-display text-xl font-semibold leading-relaxed text-foreground">To improve health outcomes through quality, innovation and exceptional service.</p>
            </div>
            <Button asChild className="mt-6" size="lg"><Link to="/contact">Speak with our team <ArrowRight /></Link></Button>
          </div>
        </div>
      </section>
      <section className="border-y border-border bg-muted/40 py-14">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid gap-5 border-b border-border pb-7 md:grid-cols-2 md:items-end">
            <div><p className="font-mono text-[10px] font-bold uppercase text-brand">The Zentramed standard</p><h2 className="mt-4 font-display text-3xl font-bold text-foreground sm:text-4xl">Built around trust.</h2></div>
            <p className="text-base leading-7 text-muted-foreground">Every engagement is guided by product integrity, responsive service and a clear understanding of institutional healthcare needs.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4">
            {standards.map(({ icon: Icon, title, body }, index) => <article key={title} className="border-b border-border py-6 md:px-7 lg:border-b-0 lg:border-r lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0">
              <div className="flex items-center justify-between"><Icon className="h-7 w-7 text-brand" strokeWidth={1.6} /><span className="font-mono text-[10px] text-muted-foreground">0{index + 1}</span></div>
              <h3 className="mt-5 font-display text-lg font-bold text-foreground">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{body}</p>
            </article>)}
          </div>
        </div>
      </section>
      <SiteFooter /><WhatsAppFloat />
    </div>
  );
}

export function PageHero({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand via-brand to-topbar text-brand-foreground">
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "22px 22px" }} />
      <div className="relative mx-auto max-w-7xl px-4 py-20 text-center">
        <div className="mx-auto inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-accent">
          <span className="h-px w-10 bg-accent" /> Zentramed Health <span className="h-px w-10 bg-accent" />
        </div>
        <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-3 max-w-2xl text-brand-foreground/80">{subtitle}</p>}
      </div>
    </section>
  );
}
