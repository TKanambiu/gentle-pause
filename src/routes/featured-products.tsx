import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { whatsappLink } from "@/lib/whatsapp";
import { COMPANY, formatKES } from "@/data/catalogue";

export const Route = createFileRoute("/featured-products")({
  head: () => ({
    meta: [
      { title: "Featured Products | Dialysis, qPCR, HIV Kits & Ophthalmic" },
      {
        name: "description",
        content:
          "Zentramed Health featured equipment: free WT-T6000S hemodialysis machine placement programme, VQ200 qPCR system, HIV 1+2 rapid test kits and the AST-1000 ophthalmic workstation.",
      },
      { property: "og:title", content: "Featured Products — Zentramed Health" },
      {
        property: "og:description",
        content:
          "Flagship medical equipment from Zentramed Health, including our free hemodialysis machine placement programme.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FeaturedProductsPage,
});

/** Image that simply disappears if the file has not been uploaded yet. */
function SafeImg({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [ok, setOk] = useState(true);
  if (!ok) return null;
  return <img src={src} alt={alt} loading="lazy" onError={() => setOk(false)} className={className} />;
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-featured px-3 py-1 text-xs font-bold uppercase tracking-wider text-featured-foreground">
      {children}
    </span>
  );
}

function Tick({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-featured" />
      <span>{children}</span>
    </li>
  );
}

function Enquire({ product, className = "" }: { product: string; className?: string }) {
  return (
    <a
      href={whatsappLink(`Hello ${COMPANY.name}, I would like more information on the ${product}.`)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-full bg-featured px-6 py-3 text-sm font-bold text-featured-foreground shadow-md transition hover:brightness-105 ${className}`}
    >
      Enquire on WhatsApp →
    </a>
  );
}

function FeaturedProductsPage() {
  return (
    <div>
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-topbar text-topbar-foreground">
        <div className="animate-soft-glow pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_25%_30%,oklch(0.55_0.06_60),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-20">
          <Badge>Featured</Badge>
          <h1 className="mt-4 font-display text-3xl font-bold md:text-5xl">Featured Products & Programmes</h1>
          <p className="mt-4 max-w-2xl text-white/75">
            Our flagship equipment lines — dialysis, molecular diagnostics, rapid testing and eye care —
            available with placement programmes, financing options and full technical support.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
            <a href="#dialysis" className="rounded-full border border-white/30 px-4 py-2 hover:bg-white/10">Hemodialysis Placement</a>
            <a href="#qpcr" className="rounded-full border border-white/30 px-4 py-2 hover:bg-white/10">VQ200 qPCR System</a>
            <a href="#hiv" className="rounded-full border border-white/30 px-4 py-2 hover:bg-white/10">HIV 1+2 Rapid Test</a>
            <a href="#ophthalmic" className="rounded-full border border-white/30 px-4 py-2 hover:bg-white/10">AST-1000 Workstation</a>
          </div>
        </div>
      </section>

      {/* 1. Dialysis placement programme */}
      <section id="dialysis" className="scroll-mt-24 bg-featured-soft">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Badge>Free Placement Programme</Badge>
              <h2 className="mt-4 font-display text-3xl font-bold text-brand md:text-4xl">
                Free Hemodialysis Machine Placement Program
              </h2>
              <p className="mt-2 text-lg font-semibold text-foreground">
                Hemodialysis Device — Model WT-T6000S (Online HDF)
              </p>
              <p className="mt-4 text-muted-foreground">
                Increase your dialysis capacity without the burden of a large upfront investment. We
                place the WT-T6000S (Online HDF) hemodialysis device in eligible hospitals and dialysis
                centres at no initial cost through our Equipment Placement Program.
              </p>
              <div className="mt-6 rounded-xl border-2 border-featured bg-background p-5">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Equipment cost to your facility</div>
                <div className="mt-1 font-display text-3xl font-bold text-brand">KES 0 upfront</div>
                <div className="mt-1 text-sm text-muted-foreground">Ownership transfers after 5 years · consumables agreement applies</div>
              </div>
              <Enquire product="WT-T6000S Hemodialysis Placement Program" className="mt-6" />
            </div>

            <div className="grid gap-6 lg:col-span-7 lg:grid-cols-2">
              <SafeImg
                src="/hero4.webp"
                alt="WT-T6000S Online HDF hemodialysis machine"
                className="col-span-full h-72 w-full rounded-xl bg-white object-contain p-4 shadow-[var(--shadow-card)]"
              />
              <div className="rounded-xl bg-background p-6 shadow-[var(--shadow-card)]">
                <h3 className="font-display text-lg font-semibold text-brand">Program Benefits</h3>
                <ul className="mt-4 space-y-3">
                  <Tick>No upfront equipment purchase cost.</Tick>
                  <Tick>Certified medical device meeting applicable quality and regulatory standards.</Tick>
                  <Tick>Flexible payment arrangements for approved hospitals, within mutually agreed timelines.</Tick>
                  <Tick>Reliable supply of premium dialysis consumables.</Tick>
                  <Tick>Professional installation, training and technical support (where applicable).</Tick>
                  <Tick>Full ownership transferred to your facility after five (5) years, subject to the consumables supply agreement.</Tick>
                </ul>
              </div>
              <div className="rounded-xl bg-background p-6 shadow-[var(--shadow-card)]">
                <h3 className="font-display text-lg font-semibold text-brand">How the Program Works</h3>
                <ol className="mt-4 space-y-4">
                  {[
                    "Your hospital receives a WT-T6000S (Online HDF) hemodialysis machine at no upfront cost.",
                    "The facility agrees to purchase its dialysis consumables from us for the duration of the agreement.",
                    "Approved hospitals may benefit from flexible payment terms for consumables based on agreed credit arrangements.",
                    "On successful completion of the five-year agreement, ownership of the machine transfers to your hospital at no additional cost.",
                  ].map((s, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-featured font-display text-sm font-bold text-featured-foreground">
                        {i + 1}
                      </span>
                      <span className="text-sm leading-relaxed text-muted-foreground">{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="col-span-full rounded-xl border border-border bg-background p-6">
                <h3 className="font-display text-lg font-semibold text-brand">Ideal For</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Public Hospitals", "Private Hospitals", "Dialysis Centres", "Renal Care Clinics", "Institutions expanding dialysis services"].map((t) => (
                    <span key={t} className="rounded-full border border-featured/50 bg-featured-soft px-4 py-1.5 text-sm font-medium text-foreground">
                      {t}
                    </span>
                  ))}
                </div>
                <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                  Contact us today to discuss eligibility, financing arrangements and how your facility can
                  benefit from our Dialysis Machine Placement Program. Terms and conditions apply —
                  eligibility, credit approval and contractual requirements are subject to assessment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. qPCR VQ200 */}
      <section id="qpcr" className="scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <Badge>Molecular Diagnostics</Badge>
              <h2 className="mt-4 font-display text-3xl font-bold text-brand md:text-4xl">
                VQ-200 Real-Time PCR System
              </h2>
              <p className="mt-2 text-lg font-semibold text-foreground">
                96-well, 4-channel qPCR · Yuanzan Life Science
              </p>
              <p className="mt-4 text-muted-foreground">
                An open-platform, 96-well real-time PCR system for laboratories running infectious
                disease, oncology and molecular screening workloads. Unlike most qPCR systems, the
                VQ-200 doesn't lock you into proprietary consumables, a bundled computer or a closed
                analysis algorithm — performance that competes with the best, at a price that makes sense.
              </p>
              <ul className="mt-6 space-y-3">
                <Tick><strong>Consumable freedom</strong> — works with any brand of 0.1/0.2 mL tubes, 8-strip tubes and 96-well plates. No proprietary plastics.</Tick>
                <Tick><strong>No bundled computer</strong> — built-in 9" touch screen and embedded computer; USB/RS485 for custom integration.</Tick>
                <Tick><strong>Open analysis algorithm</strong> — acquisition parameters customisable per reagent kit, custom reports and LIMS integration.</Tick>
                <Tick><strong>Automation ready</strong> — motorised lid, auto-loading chamber, ready for robotic and dark-lab environments.</Tick>
                <Tick>Single-copy sensitivity, dynamic range 1–10<sup>10</sup> copies, linearity r ≥ 0.99, Ct CV ≤ 1%.</Tick>
                <Tick>Installation, operator training and ongoing service support included.</Tick>
              </ul>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  ["Format", "96-well, 4-channel real-time PCR"],
                  ["Models", "VQ-200A standalone · VQ-200B external PC / OEM"],
                  ["Thermal accuracy", "±0.1 °C · uniformity ±0.15 °C"],
                  ["Ramp rate", "Heating ≥ 7 °C/s · cooling ≥ 5 °C/s"],
                  ["Temperature range", "4.0 – 99.0 °C"],
                  ["Optics", "White LED 450–750 nm · CMOS detector"],
                  ["Channels", "FAM/SYBR · HEX/JOE/VIC/TET · CY5/Texas Red · ROX"],
                  ["Reaction volume", "5 – 100 µL · qualitative, absolute/RQ, melt curve"],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-lg border border-border bg-background p-3">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{k}</div>
                    <div className="mt-1 text-sm font-medium text-foreground">{v}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Enquire product="VQ-200 Real-Time PCR System" />
                <a
                  href="/featured/qPCR-VQ200-EN.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-brand px-6 py-3 text-sm font-bold text-brand hover:bg-brand hover:text-brand-foreground"
                >
                  Download brochure (PDF)
                </a>
              </div>
              <p className="mt-3 text-sm font-semibold text-muted-foreground">Price on request — configuration dependent.</p>
            </div>
            <div className="lg:sticky lg:top-28">
              <SafeImg
                src="/featured/vq200-qpcr.jpg"
                alt="VQ-200 96-well real-time PCR system on a laboratory bench"
                className="w-full rounded-xl bg-white object-cover shadow-[var(--shadow-card)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. HIV rapid test */}
      <section id="hiv" className="scroll-mt-24 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <img
              src="/KHB HIV Diagnostic Test Kit.png"
              alt="KHB Diagnostic Kit for HIV (1+2) Antibody colloidal gold rapid test with cassettes, diluent and lancet"
              loading="lazy"
              className="order-2 h-80 w-full rounded-xl bg-white object-contain p-6 shadow-[var(--shadow-card)] lg:order-1"
            />
            <div className="order-1 lg:order-2">
              <Badge>Rapid Testing</Badge>
              <h2 className="mt-4 font-display text-3xl font-bold text-brand md:text-4xl">
                KHB Diagnostic Kit for HIV (1+2) Antibody — Colloidal Gold V2
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {["WHO PQ", "CE IVDR", "POCT", "Kehua Biotech"].map((t) => (
                  <span key={t} className="rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand">{t}</span>
                ))}
              </div>
              <p className="mt-4 text-muted-foreground">
                A rapid, single-use immunochromatographic test for the qualitative detection of antibodies
                to HIV-1 and HIV-2 in whole blood, serum or plasma. Built on a superior mammalian-expressed
                gp160 antigen for high sensitivity and very low cross-reactivity — ideal for clinics,
                outreach screening programmes and laboratories that need results on the spot.
              </p>
              <ul className="mt-6 space-y-3">
                <Tick>Small sample size — only 40 µL of whole blood, serum or plasma.</Tick>
                <Tick>Result read in 15–25 minutes; no equipment required.</Tick>
                <Tick>Sensitivity 100% (95% CI 99.2–100%) · Specificity 100% (95% CI 99.4–100%) on 1,117 reference samples.</Tick>
                <Tick>Zero indeterminate, false-negative and false-positive results in reference testing.</Tick>
                <Tick>Stable storage up to 24 months at 4–30 °C — suited to field conditions.</Tick>
                <Tick>Kits supplied with test cassettes, sample diluent, safety lancets, alcohol pads and transfer pipettes (1, 25 and 50-test packs).</Tick>
                <Tick>Suitable for NGO, humanitarian and mass-screening deployments — bulk pricing available.</Tick>
              </ul>
              <div className="mt-6 rounded-xl border border-border bg-background p-4">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Catalogue price</span>
                <div className="font-display text-2xl font-bold text-brand">{formatKES(9500)}</div>
                <div className="text-sm text-muted-foreground">Reseller / trade: {formatKES(8500)} · bulk quotes on request</div>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Enquire product="HIV (1+2) Antibody Diagnostic Kit" />
                <a
                  href="/featured/HIV-1-2-Antibody-Colloidal-Gold.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-brand px-6 py-3 text-sm font-bold text-brand hover:bg-brand hover:text-brand-foreground"
                >
                  Download insert (PDF)
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. AST-1000 */}
      <section id="ophthalmic" className="scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <Badge>Eye Care</Badge>
              <h2 className="mt-4 font-display text-3xl font-bold text-brand md:text-4xl">
                AST-1000 Ophthalmic Workstation
              </h2>
              <p className="mt-4 text-muted-foreground">
                Enhance your eye care services with a modern ophthalmic workstation designed for efficient
                and accurate patient examinations.
              </p>
              <h3 className="mt-8 font-display text-lg font-semibold text-brand">Features</h3>
              <ul className="mt-4 space-y-3">
                <Tick>Ergonomic workstation design.</Tick>
                <Tick>Smooth electric table controls.</Tick>
                <Tick>Integrated ophthalmic examination equipment.</Tick>
                <Tick>User-friendly touchscreen interface.</Tick>
                <Tick>Ideal for hospitals, eye clinics and optical practices.</Tick>
                <Tick>Built for reliability and everyday clinical use.</Tick>
              </ul>
              <h3 className="mt-8 font-display text-lg font-semibold text-brand">Why choose the AST-1000?</h3>
              <p className="mt-2 text-muted-foreground">
                Deliver accurate eye examinations with equipment designed to improve workflow, patient
                comfort and diagnostic efficiency.
              </p>
              <p className="mt-4 text-sm font-semibold text-muted-foreground">Price on request — configuration dependent.</p>
              <Enquire product="AST-1000 Ophthalmic Workstation" className="mt-6" />
            </div>
            <div className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-xl bg-topbar p-2 shadow-[var(--shadow-card)]">
                <video
                  src="/featured/ast-1000.mp4"
                  controls
                  playsInline
                  muted
                  loop
                  preload="metadata"
                  poster="/featured/ast-1000-poster.jpg"
                  className="mx-auto max-h-[640px] w-auto rounded-lg"
                />
              </div>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                AST-1000 in use — electric table controls and touchscreen interface.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="rounded-2xl bg-brand p-8 text-brand-foreground">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl font-bold">Talk to a specialist about these programmes</h3>
              <p className="mt-1 text-brand-foreground/80">
                Eligibility, financing, installation and training — we handle it end to end.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Enquire product="featured products range" />
              <Link to="/contact" className="inline-flex items-center rounded-full border border-white/40 px-6 py-3 text-sm font-bold hover:bg-white/10">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}