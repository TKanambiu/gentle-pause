import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import aboutImg from "@/assets/about.jpg";
import { CheckCircle2 } from "lucide-react";

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
  return (
    <div>
      <SiteHeader />
      <PageHero title="About Zentramed Health" subtitle="Advancing Healthcare and Humanitarian Solutions" />
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid items-start gap-12 md:grid-cols-2">
          <img src={aboutImg} alt="Healthcare professional" className="rounded-xl shadow-lg" loading="lazy" />
          <div>
            <h2 className="font-display text-3xl font-bold text-brand">Who we are</h2>
            <p className="mt-4 text-muted-foreground">
              Zentramed Health is a trusted supplier of high-quality medical supplies, equipment and
              solutions to hospitals, clinics, NGOs, government institutions and humanitarian
              organizations across Africa. From wound care to imaging, oxygen therapy to hospital
              furniture — we deliver the full spectrum of what healthcare facilities need to run.
            </p>
            <h3 className="mt-8 font-display text-xl font-semibold text-brand">Our mission</h3>
            <p className="mt-2 text-muted-foreground">
              To improve health outcomes by delivering quality, innovation and exceptional service to
              every institution we serve.
            </p>
            <div className="mt-8 grid gap-3">
              {[
                "Quality Assured — certified and approved products only",
                "Wide Range — comprehensive selection for every healthcare need",
                "Reliable Delivery — timely and secure across the region",
                "Customer Focus — dedicated support before and after sales",
                "Competitive Prices — enterprise pricing for institutions and NGOs",
              ].map((v) => (
                <div key={v} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-sm">{v}</span>
                </div>
              ))}
            </div>
            <Link to="/contact" className="mt-8 inline-block rounded-md bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground">
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-muted/40 py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-3">
          {[
            { k: "9", l: "Product categories" },
            { k: "500+", l: "Products stocked" },
            { k: "Africa-wide", l: "Delivery reach" },
          ].map((s) => (
            <div key={s.l} className="rounded-xl bg-background p-8 text-center shadow-sm">
              <div className="font-display text-4xl font-bold text-brand">{s.k}</div>
              <div className="mt-2 text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>
      <SiteFooter />
      <WhatsAppFloat />
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
