import { OptimizedImage } from "@/components/optimized-image";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { CompanyPageCover } from "@/components/company-page-cover";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({ meta: [
    { title: "Healthcare Equipment & Supply Services | Zentramed Health" },
    { name: "description", content: "Explore Zentramed Health installation, maintenance, operator training, humanitarian supply, custom sourcing and regional delivery services." },
    { property: "og:title", content: "Zentramed Health Services | From Sourcing to Support" },
    { property: "og:description", content: "Practical equipment and supply support for hospitals, laboratories, clinics and humanitarian programmes." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ServicesPage,
});

const SERVICES = [
  { id: "installation", image: "/svc-installation.webp", title: "Installation & commissioning", label: "Ready for clinical use", body: "Professional installation of medical, laboratory and imaging equipment, with commissioning support to help your facility move from delivery to everyday use.", detail: "Discuss your equipment, site requirements and installation needs with our team so that the handover reflects your facility's workflow.", scope: ["Medical & laboratory equipment", "Equipment setup", "Commissioning support"] },
  { id: "maintenance", image: "/svc-maintenance.webp", title: "Maintenance & repair", label: "Care for your equipment", body: "Preventive maintenance and on-site repair support help healthcare facilities keep essential equipment working and address faults that interrupt patient care.", detail: "Talk to us about scheduled maintenance contracts or a specific equipment issue. Our team can discuss the service needs of the equipment you use.", scope: ["Scheduled maintenance", "On-site repair", "Equipment service support"] },
  { id: "training", image: "/svc-training.webp", title: "Operator training", label: "Confidence in everyday use", body: "Hands-on training for clinical and laboratory staff on the equipment we supply, connecting product knowledge with the practical needs of your care team.", detail: "Training focuses on helping operators become familiar with their equipment and use it effectively within their clinical or laboratory environment.", scope: ["Hands-on instruction", "Clinical & laboratory teams", "Equipment familiarisation"] },
  { id: "humanitarian", image: "/svc-humanitarian.webp", title: "Humanitarian & NGO supply", label: "Supporting care programmes", body: "Bulk medical supply for humanitarian organisations and government programmes, with coordinated logistics to support institutional procurement needs.", detail: "Share your programme's product list, quantities and destination. We can discuss the supplies and delivery arrangements needed for your operation.", scope: ["Bulk medical supplies", "NGO & institutional procurement", "Coordinated logistics"] },
  { id: "sourcing", image: "/svc-custom-sourcing.webp", title: "Custom sourcing", label: "Beyond the catalogue", body: "When the product you need is not in our standard range, we source certified medical products globally on request through trusted manufacturers.", detail: "Send the product name, intended use or equipment specification. Our team can discuss suitable sourcing options for your facility or programme.", scope: ["Specialist product requests", "Global sourcing", "Specification-led enquiries"] },
  { id: "delivery", image: "/svc-delivery.webp", title: "Regional delivery", label: "From our base to your facility", body: "Secure delivery across Kenya and the wider East African region, connecting our Nairobi base with healthcare facilities and programmes beyond the city.", detail: "Delivery arrangements depend on your order and destination. Contact our team to discuss the receiving location and logistics for your supplies.", scope: ["Kenya & East Africa", "Institutional deliveries", "Order & destination coordination"] },
];

function ServicesPage() {
  return <div className="about-content">
    <SiteHeader />
    <main>
      <CompanyPageCover image="/svc-installation.webp" imageAlt="Medical equipment installation in a healthcare facility" label="Zentramed Health / Facility & programme support" title="Healthcare services" description="From sourcing the right product to keeping equipment in service. Practical support for hospitals, clinics, laboratories and humanitarian programmes." />
      <section className="border-b border-border px-5 py-10 md:px-10 lg:px-12">
        <div className="grid gap-7 lg:grid-cols-[1fr_2fr]"><div><p className="text-xs font-semibold uppercase text-brand">Our expertise</p><h2 className="mt-3 text-2xl font-semibold">Support at every stage.</h2></div><nav aria-label="Service sections" className="grid grid-cols-2 gap-x-5 sm:grid-cols-3">{SERVICES.map((service, i) => <a key={service.id} href={`#${service.id}`} className="flex items-center gap-2 border-b border-border py-3 text-xs font-medium transition hover:text-brand md:text-sm"><span className="text-brand">0{i + 1}</span><span>{service.title}</span><ArrowUpRight className="ml-auto h-3.5 w-3.5 shrink-0" /></a>)}</nav></div>
      </section>
      {SERVICES.map((service, i) => <section key={service.id} id={service.id} className={`scroll-mt-64 grid items-center gap-8 border-b border-border px-5 py-12 md:px-10 lg:grid-cols-2 lg:gap-14 lg:px-12 lg:py-16 ${i % 2 ? "bg-secondary/60" : "bg-background"}`}>
        <figure className={`min-w-0 ${i % 2 ? "lg:order-2" : ""}`}><OptimizedImage src={service.image} alt={service.title} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[3/2] w-full object-cover" /><figcaption className="mt-3 flex justify-between gap-3 text-xs text-muted-foreground"><span>{service.label}</span><span className="text-brand">Service / 0{i + 1}</span></figcaption></figure>
        <div className="min-w-0"><p className="text-xs font-semibold uppercase text-brand">0{i + 1} / {service.label}</p><h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">{service.title}</h2><p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">{service.body}</p><p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">{service.detail}</p><ul className="mt-6 border-t border-border">{service.scope.map((item) => <li key={item} className="flex items-center gap-3 border-b border-border py-3 text-sm"><span className="h-1 w-4 bg-brand" />{item}</li>)}</ul><Button asChild variant="link" className="mt-5 px-0"><Link to="/contact">Discuss {service.title.toLowerCase()} <ArrowUpRight /></Link></Button></div>
      </section>)}
      <section className="px-5 py-14 md:px-10 lg:px-12 lg:py-20"><p className="text-xs font-semibold uppercase text-brand">Start a conversation</p><div className="mt-4 grid gap-8 lg:grid-cols-2"><h2 className="max-w-xl text-3xl font-semibold leading-tight md:text-4xl">The right support starts with your requirements.</h2><div className="grid gap-6 sm:grid-cols-3">{[['Your facility', 'Tell us about your care setting, equipment or programme.'], ['Your requirements', 'Share product details, specifications, quantities and destination.'], ['Your next step', 'Our team will discuss suitable products and service arrangements.']].map(([title, body], i) => <div key={title} className="border-t border-border pt-4"><span className="text-xs font-semibold text-brand">0{i + 1}</span><h3 className="mt-3 text-base font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p></div>)}</div></div></section>
      <section className="flex flex-wrap items-center justify-between gap-7 bg-topbar px-5 py-12 text-topbar-foreground md:px-10 lg:px-12"><div><p className="text-xs font-semibold uppercase text-topbar-foreground/70">Let’s work together</p><h2 className="mt-3 text-3xl font-semibold">Need a tailored service package?</h2><p className="mt-3 max-w-xl text-sm leading-7 text-topbar-foreground/80">Talk to our specialists about the equipment, supplies and support your facility needs.</p></div><div className="flex flex-wrap gap-3"><WhatsAppButton text="Hello Zentramed Health, I'd like to discuss your services." label="Talk to Us" badge={null} /><Button asChild variant="secondary" size="lg"><Link to="/contact">Contact our team <ArrowUpRight /></Link></Button></div></section>
    </main>
    <SiteFooter /><WhatsAppFloat />
  </div>;
}
