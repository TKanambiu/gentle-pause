import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { PageHero } from "./about";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { COMPANY } from "@/data/catalogue";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | Zentramed Health" },
      { name: "description", content: "Installation, maintenance, training, humanitarian supply and custom sourcing services from Zentramed Health." },
      { property: "og:title", content: "Zentramed Health Services" },
      { property: "og:description", content: "End-to-end support for hospitals, clinics and NGOs." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

const SERVICES = [
  { image: "/svc-installation.webp", title: "Equipment Installation & Commissioning", body: "Professional installation of medical, laboratory and imaging equipment with full commissioning support." },
  { image: "/svc-maintenance.webp", title: "Preventive Maintenance & Repair", body: "Scheduled maintenance contracts and rapid on-site repair to keep your equipment running." },
  { image: "/svc-training.webp", title: "Operator Training", body: "Hands-on training for clinical and lab staff on the equipment we supply." },
  { image: "/svc-humanitarian.webp", title: "Humanitarian & NGO Supply", body: "Bulk supply to humanitarian organizations and government programs with reliable logistics." },
  { image: "/svc-custom-sourcing.webp", title: "Custom Sourcing", body: "Can't find what you need? We source certified products globally on request." },
  { image: "/svc-delivery.webp", title: "Regional Delivery", body: "Timely and secure delivery across Kenya and the wider East African region." },
];

function ServicesPage() {
  return (
    <div>
      <SiteHeader />
      <PageHero title="Our Services" subtitle="End-to-end support for every healthcare facility we serve" />
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, idx) => (
            <div
              key={s.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition hover:-translate-y-1.5 hover:shadow-xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand/80 via-brand/20 to-transparent" />
                <span className="absolute right-4 top-4 font-display text-3xl font-black text-white/40">
                  0{idx + 1}
                </span>
                <div className="absolute bottom-4 left-4">
                  <span className="rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent-foreground shadow">
                    Service
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold text-brand">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-gradient-to-r from-brand to-topbar px-8 py-8 text-white shadow-xl">
          <div>
            <h3 className="font-display text-2xl font-bold">Need a tailored service package?</h3>
            <p className="mt-1 text-sm text-white/80">Talk to our specialists — we respond within one business day.</p>
          </div>
          <WhatsAppButton
            text="Hello Zentramed Health, I'd like to discuss your services."
            label="Talk to Us"
          />
        </div>
      </section>
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}

