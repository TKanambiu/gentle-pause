import { OptimizedImage } from "@/components/optimized-image";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { CompanyPageCover } from "@/components/company-page-cover";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { PARTNER_LOGOS } from "@/data/partner-logos";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About Us | Zentramed Health Nairobi" },
    { name: "description", content: "Meet Zentramed Health, Nairobi's medical equipment and healthcare supply partner for hospitals, clinics, institutions and humanitarian programmes across Africa." },
    { property: "og:title", content: "About Zentramed Health | Our People, Purpose & Standards" },
    { property: "og:description", content: "Discover our clinical focus, medical supply expertise and commitment to dependable healthcare across Africa." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: AboutPage,
});

const STANDARDS = [
  { title: "Product integrity", body: "We source medical products from trusted global manufacturers, keeping quality and suitability at the centre of every supply decision." },
  { title: "Clinical understanding", body: "From a clinic's everyday consumables to a hospital's specialist equipment, our approach starts with the needs of the people delivering care." },
  { title: "Dependable support", body: "Supply is only the beginning. Installation, operator training and maintenance support help facilities make the most of their equipment." },
  { title: "Regional perspective", body: "Based in Nairobi, we support healthcare facilities and humanitarian partners with coordinated delivery in Kenya and the wider East African region." },
];

function AboutPage() {
  return <div className="about-content">
    <SiteHeader />
    <main>
      <CompanyPageCover image="/medical-grade-storage-facility.webp" imageAlt="Organised medical supplies in a healthcare storage facility" label="About us / Nairobi, Kenya" title="Zentramed Health" description="Better healthcare begins with dependable supply. Medical equipment, clinical essentials and humanitarian solutions for the people delivering care." />
      <div className="grid grid-cols-2 border-b border-border bg-secondary px-5 md:grid-cols-4 md:px-10 lg:px-12">
        {[['500+', 'Products stocked'], ['9', 'Clinical categories'], ['Nairobi', 'Our home base'], ['Africa', 'Our healthcare focus']].map(([value, label]) => <div key={label} className="border-r border-border py-6 pl-4 first:pl-0 last:border-r-0 md:py-7"><p className="font-editorial text-2xl font-semibold text-brand md:text-3xl">{value}</p><p className="mt-1 text-xs text-muted-foreground">{label}</p></div>)}
      </div>
      <section className="grid items-center gap-10 px-5 py-14 md:px-10 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-20">
        <div>
          <p className="text-xs font-semibold uppercase text-brand">01 / Who we are</p>
          <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-tight md:text-4xl">A committed partner to every care environment.</h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground">Zentramed Health brings together medical supplies, equipment and practical support for hospitals, clinics, NGOs and public institutions. We connect the breadth of a medical catalogue with an understanding of how healthcare facilities work.</p>
          <p className="mt-4 max-w-xl text-base leading-8 text-muted-foreground">Our range spans protective wear, wound care, laboratory diagnostics, monitoring, respiratory care, maternity, hospital furniture, theatre equipment and imaging. Whether equipping a ward or replenishing essential supplies, we help care teams find solutions suited to their needs.</p>
          <Button asChild variant="link" className="mt-5 px-0"><Link to="/products">Explore our catalogue <ArrowUpRight /></Link></Button>
        </div>
        <figure className="min-w-0">
          <OptimizedImage src="/svc-training.webp" alt="Medical equipment training for healthcare professionals" sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[4/3] w-full object-cover" />
          <figcaption className="flex items-start justify-between gap-4 border-b border-border py-4 text-xs text-muted-foreground"><span>Practical expertise. A clinical focus.</span><span className="text-brand">Zentramed Health</span></figcaption>
        </figure>
      </section>
      <section className="grid border-y border-border bg-secondary md:grid-cols-2">
        <div className="px-5 py-12 md:border-r md:border-border md:px-10 lg:px-12"><p className="text-xs font-semibold uppercase text-brand">Our mission</p><h2 className="mt-5 max-w-xl text-2xl font-semibold leading-relaxed md:text-3xl">To improve health outcomes through quality, innovation and exceptional service.</h2></div>
        <div className="px-5 pb-12 md:px-10 md:py-12 lg:px-12"><p className="text-xs font-semibold uppercase text-brand">Our purpose</p><h2 className="mt-5 max-w-xl text-2xl font-semibold leading-relaxed md:text-3xl">Advancing healthcare and humanitarian solutions across Africa.</h2><p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">We support the institutions and programmes that make healthcare possible, with products and services that respond to real clinical and operational needs.</p></div>
      </section>
      <section className="px-5 py-14 md:px-10 lg:px-12 lg:py-20">
        <div className="grid gap-6 md:grid-cols-2 md:items-end"><div><p className="text-xs font-semibold uppercase text-brand">02 / The Zentramed standard</p><h2 className="mt-4 text-3xl font-semibold md:text-4xl">Built around trust.</h2></div><p className="max-w-xl text-base leading-7 text-muted-foreground">Product integrity, responsive service and a clear understanding of institutional healthcare needs guide every engagement.</p></div>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4">{STANDARDS.map((item, i) => <article key={item.title} className="border-t border-border py-7 md:pr-7 lg:border-r lg:px-7 lg:first:pl-0 lg:last:border-r-0"><span className="font-editorial text-4xl font-medium text-brand/40">0{i + 1}</span><h3 className="mt-5 text-xl font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.body}</p></article>)}</div>
      </section>
      <section className="grid bg-topbar text-topbar-foreground lg:grid-cols-2">
        <OptimizedImage src="/svc-humanitarian.webp" alt="Healthcare supplies prepared for humanitarian programmes" sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[3/2] h-full max-h-[480px] w-full object-cover" />
        <div className="self-center px-5 py-12 md:px-10 lg:px-12"><p className="text-xs font-semibold uppercase text-topbar-foreground/70">03 / Who we support</p><h2 className="mt-5 text-3xl font-semibold leading-tight md:text-4xl">From everyday care to humanitarian response.</h2><p className="mt-5 max-w-xl text-base leading-8 text-topbar-foreground/80">We work with hospitals and clinics, diagnostic laboratories, public institutions and humanitarian organisations. Each has different requirements; all need dependable access to medical essentials.</p><div className="mt-6 border-y border-topbar-foreground/20 py-4 text-sm leading-7">Hospitals & clinics · Laboratories · NGOs & humanitarian programmes · Public institutions</div><Button asChild variant="secondary" className="mt-7"><Link to="/services">Discover our services <ArrowUpRight /></Link></Button></div>
      </section>
      <section className="px-5 pt-14 md:px-10 lg:px-12"><p className="text-xs font-semibold uppercase text-brand">Our supply network</p><h2 className="mt-4 text-3xl font-semibold">Connected to trusted manufacturers.</h2><p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">Our catalogue brings together established medical and healthcare brands, giving facilities a broad choice of products through one supply partner.</p><div className="mt-8 grid grid-cols-3 items-center gap-6 border-y border-border py-7 sm:grid-cols-4 lg:grid-cols-8">{PARTNER_LOGOS.slice(0, 8).map((partner) => <img key={partner} src={partner} alt={`${partner.split("/").pop()?.replace(".png", "").toUpperCase()} partner logo`} loading="lazy" className="mx-auto h-14 w-full max-w-28 object-contain" />)}</div></section>
    </main>
    <SiteFooter /><WhatsAppFloat />
  </div>;
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
