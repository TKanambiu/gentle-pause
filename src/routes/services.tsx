import { OptimizedImage } from "@/components/optimized-image";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { PageHero } from "./about";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { useState } from "react";

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
  const [paused, setPaused] = useState(false);
  return (
    <div>
      <SiteHeader />
      <PageHero title="Our Services" subtitle="End-to-end support for every healthcare facility we serve" />
      <section className="py-16">
        <div
          className="group mx-auto w-full max-w-4xl px-4"
          role="region"
          aria-label="Our services"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false); }}
        >
          <div className={`relative h-32 md:h-36 ${paused ? "svc-rotator-paused" : ""}`}>
            {SERVICES.map((s, idx) => (
              <div
                key={s.title}
                aria-hidden={idx !== 0 ? true : undefined}
                className={`svc-cycle absolute inset-0 flex items-center gap-4 rounded-2xl border border-border bg-card p-3 shadow-sm md:gap-6 md:p-4 ${idx % 2 === 0 ? "" : "svc-cycle-right"}`}
                style={{ animationDelay: `${idx * 4}s` }}
              >
                <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl md:h-24 md:w-40">
                  <OptimizedImage
                    src={s.image}
                    sizes="160px"
                    alt={idx === 0 ? s.title : ""}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute right-2 top-1 font-display text-xl font-black text-white/70">
                    0{idx + 1}
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-base font-semibold text-brand md:text-lg">{s.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground md:text-sm">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 flex max-w-7xl flex-wrap items-center justify-between gap-6 rounded-2xl bg-gradient-to-r from-brand to-topbar px-8 py-8 text-white shadow-xl">
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

