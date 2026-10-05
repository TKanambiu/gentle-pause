import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { whatsappLink, openWhatsApp } from "@/lib/whatsapp";
import { PageHero } from "./about";
import { COMPANY } from "@/data/catalogue";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | Zentramed Health Nairobi" },
      { name: "description", content: "Contact Zentramed Health for medical equipment quotes, orders and technical support. Based at Bazaar Plaza, Nairobi, Kenya." },
      { property: "og:title", content: "Contact Zentramed Health" },
      { property: "og:description", content: "Reach us for quotes, orders and support." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const msg = `Hello Zentramed Health,\n\nName: ${fd.get("name")}\nEmail: ${fd.get("email")}\nPhone: ${fd.get("phone")}\n\n${fd.get("message")}`;
    openWhatsApp(msg);
    setSent(true);
  }
  return (
    <div>
      <SiteHeader />
      <PageHero title="Contact Us" subtitle="We'd love to hear from you — quotes, orders and support" />
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-brand">Get in touch</h2>
            <p className="mt-2 text-muted-foreground">Our team responds within one business day.</p>
            <div className="mt-8 space-y-4 text-sm">
              <a href={`tel:${COMPANY.phones[0].replace(/\s/g, "")}`} className="flex items-start gap-3 rounded-lg border border-border p-4 hover:border-brand">
                <Phone className="h-5 w-5 text-accent" />
                <div>
                  <div className="font-semibold">Call us</div>
                  {COMPANY.phones.map((p) => <div key={p} className="text-muted-foreground">{p}</div>)}
                </div>
              </a>
              <a href={`mailto:${COMPANY.email}`} className="flex items-start gap-3 rounded-lg border border-border p-4 hover:border-brand">
                <Mail className="h-5 w-5 text-accent" />
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-muted-foreground">{COMPANY.email}</div>
                </div>
              </a>
              <div className="flex items-start gap-3 rounded-lg border border-border p-4">
                <MapPin className="h-5 w-5 text-accent" />
                <div>
                  <div className="font-semibold">Office</div>
                  <div className="text-muted-foreground">{COMPANY.address}</div>
                </div>
              </div>
              <a href={whatsappLink("Hello Zentramed Health, I'd like to chat.")} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 rounded-lg bg-[#25D366] p-4 text-white hover:brightness-95">
                <MessageCircle className="h-5 w-5" />
                <div>
                  <div className="font-semibold">Chat on WhatsApp</div>
                  <div className="text-white/80">Fastest way to reach us</div>
                </div>
              </a>
            </div>
          </div>

          <form onSubmit={submit} className="rounded-xl border border-border bg-background p-6 shadow-sm">
            <h3 className="font-display text-xl font-semibold text-brand">Send us a message</h3>
            <p className="mt-1 text-sm text-muted-foreground">Fill in your details and we'll open a WhatsApp chat pre-filled with your inquiry.</p>
            <div className="mt-6 grid gap-4">
              <Field label="Full name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone" name="phone" required />
              <div>
                <label className="mb-1 block text-sm font-medium">Message</label>
                <textarea name="message" required rows={5} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-brand" />
              </div>
              <button className="rounded-md bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground hover:brightness-110">
                Send via WhatsApp
              </button>
              {sent && <div className="text-sm text-accent">Opening WhatsApp…</div>}
            </div>
          </form>
        </div>
      </section>
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <input name={name} type={type} required={required} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-brand" />
    </div>
  );
}
