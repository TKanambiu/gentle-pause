import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { CATEGORIES, COMPANY } from "@/data/catalogue";
import { useEffect, useRef, useState } from "react";
import { CategoryMarquee } from "@/components/category-marquee";
import { FeaturedMarquee } from "@/components/featured-marquee";
import { WhatsAppButton } from "@/components/whatsapp-button";
import warehouseAsset from "@/assets/site/wrhs.png.asset.json";
import { PARTNER_LOGOS } from "@/data/partner-logos";
import { HERO_SLIDES } from "@/data/hero-slides";
import { Button } from "@/components/ui/button";


const SLIDES = HERO_SLIDES;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zentramed Health | Medical Equipment & Supplies in Nairobi, Kenya" },
      { name: "description", content: "Zentramed Health is a trusted Nairobi-based supplier of medical supplies, hospital equipment, laboratory diagnostics and humanitarian healthcare solutions across Africa." },
      { property: "og:title", content: "Zentramed Health | Medical Equipment Supplier in Nairobi" },
      { property: "og:description", content: "Quality medical supplies, hospital equipment and healthcare solutions across Africa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      <SiteHeader />

      {/* Hero slider — horizontal slide-left with visible imagery */}
      <section className="relative h-[calc(100dvh-96px)] max-h-[820px] min-h-[420px] w-full overflow-hidden bg-brand md:h-[calc(100dvh-160px)]">
        <div
          className="flex h-full transition-transform duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
          style={{ width: `${SLIDES.length * 100}%`, transform: `translateX(-${i * (100 / SLIDES.length)}%)` }}
        >
          {SLIDES.map((s, idx) => (
            <div key={idx} className="relative h-full shrink-0 bg-brand" style={{ width: `${100 / SLIDES.length}%` }}>
              <img
                src={s.img}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full scale-105 object-cover opacity-35 blur-xl"
              />
              <img
                src={s.img}
                alt={`${s.eyebrow} — ${s.title} ${s.accent}`}
                loading={idx === 0 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={idx === 0 ? "high" : "low"}
                className="absolute inset-0 h-full w-full object-contain object-center"
              />
              <div className="pointer-events-none absolute inset-0 bg-hero-mobile md:hidden" />
              <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-2/3 md:block" style={{ background: "var(--gradient-hero)" }} />
              <div className="absolute inset-0 mx-auto flex h-full max-w-7xl items-center px-4">
                <div className="max-w-xl text-brand-foreground">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent/95 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-foreground shadow-lg">
                    {s.eyebrow}
                  </div>
                  <h1 className="font-display text-3xl font-bold leading-tight drop-shadow-lg md:text-5xl">
                    {s.title}{" "}
                    <span className="text-accent">{s.accent}</span>
                  </h1>
                  <p className="mt-3 max-w-lg text-sm text-brand-foreground drop-shadow md:text-base">{s.body}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <WhatsAppButton text={s.waText} />
                    <Link to="/contact" className="rounded-md border-2 border-white/80 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm hover:bg-white/20">
                      Contact Sales →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {SLIDES.map((_, idx) => (
            <Button
              variant="ghost"
              key={idx}
              onClick={() => setI(idx)}
              className={`h-3 min-w-0 rounded-full p-0 transition-all ${idx === i ? "w-10 bg-brand-foreground" : "w-3 bg-brand-foreground/50 hover:bg-brand-foreground/90"}`}
              aria-pressed={idx === i}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Trust bar — animated counters */}
      <section className="border-y border-border bg-background">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-border md:grid-cols-4">
          {[
            { value: 500, suffix: "+", label: "Products in catalogue" },
            { value: 9, suffix: "", label: "Specialised categories" },
            { value: 24, suffix: "/7", label: "WhatsApp response" },
            { value: 100, suffix: "%", label: "Certified sourcing" },
          ].map((f) => (
            <div key={f.label} className="group px-6 py-8 transition hover:bg-muted/40">
              <div className="font-display text-3xl font-bold text-brand md:text-4xl">
                <CountUp end={f.value} />{f.suffix}
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{f.label}</div>
            </div>
          ))}
        </div>
      </section>


      {/* Categories grid */}
      <section className="bg-muted/40 py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-accent">
                <span className="h-px w-10 bg-accent" /> What We Supply
              </div>
              <h2 className="mt-3 font-display text-3xl font-bold text-brand md:text-4xl">Explore Our Categories</h2>
            </div>
            <Link to="/products" className="text-sm font-semibold text-brand hover:text-accent">
              View all products →
            </Link>
          </div>
          <div className="mt-10">
            <CategoryMarquee categories={CATEGORIES} />
          </div>

        </div>
      </section>

      <FeaturedMarquee />

      {/* Services */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-brand via-brand to-topbar" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-accent">
              <span className="h-px w-10 bg-accent" /> Our Services <span className="h-px w-10 bg-accent" />
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold text-white md:text-5xl">
              Beyond supply — <span className="text-accent">end-to-end support</span>
            </h2>
            <p className="mt-4 text-brand-foreground/80">
              From procurement to installation, training and maintenance — we stand behind every product we deliver.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { image: "/svc-installation.webp", title: "Equipment Installation", body: "Professional installation of hospital, laboratory and imaging equipment." },
              { image: "/svc-maintenance.webp", title: "Maintenance & Repair", body: "Preventive maintenance contracts and rapid on-site repair services." },
              { image: "/svc-training.webp", title: "Training & Commissioning", body: "Operator training and commissioning to get your team confident from day one." },
              { image: "/svc-humanitarian.webp", title: "Humanitarian Supply", body: "Bulk supply to NGOs and government programs with reliable logistics." },
              { image: "/svc-custom-sourcing.webp", title: "Custom Sourcing", body: "Can't find what you need? We source certified products globally on request." },
              { image: "/svc-delivery.webp", title: "Regional Delivery", body: "Timely and secure delivery across Kenya and East Africa." },
            ].map((s, idx) => (
                <div
                  key={s.title}
                  className="group relative overflow-hidden rounded-2xl bg-white/[0.06] shadow-lg ring-1 ring-white/10 backdrop-blur-sm transition hover:-translate-y-1.5 hover:ring-accent/60"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand via-brand/40 to-transparent" />
                    <span className="absolute right-4 top-4 font-display text-3xl font-black text-white/30">
                      0{idx + 1}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold text-white">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-foreground/80">{s.body}</p>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* About — editorial, professional */}
      <section className="overflow-hidden border-y border-border bg-background py-16 lg:py-20">
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 lg:grid-cols-2">
          <div className="relative">
            <div className="absolute -left-4 -top-4 hidden h-full w-full border border-brand/30 md:block" />
            <img
              src={warehouseAsset.url}
              alt="Zentramed medical-grade storage and distribution facility"
              className="relative aspect-[5/4] w-full object-cover shadow-xl"
              loading="lazy"
            />
            <div className="absolute bottom-0 right-0 bg-brand px-6 py-5 text-brand-foreground shadow-xl">
              <div>
                <div className="font-display text-3xl font-bold">15+ Years</div>
                <div className="mt-1 font-mono text-[10px] uppercase">Industry expertise</div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-accent">
              <span className="h-px w-10 bg-accent" /> About Zentramed Health
            </div>
            <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
              Advancing healthcare, together.
            </h2>
            <div className="mt-6 border-l-2 border-accent/60 pl-5">
              <p className="text-muted-foreground md:text-lg">
                Zentramed Health is a trusted supplier of high-quality medical supplies, equipment and
                solutions to hospitals, clinics, NGOs, government institutions and humanitarian organizations
                across Africa. Our mission is to improve health outcomes by delivering quality, innovation
                and exceptional service.
              </p>
            </div>
            <dl className="mt-7 grid border-y border-border sm:grid-cols-2">
              {[
                { t: "Quality Assured Sourcing", d: "ISO-certified suppliers only." },
                { t: "Wide Product Range", d: "9 categories, 500+ SKUs." },
                { t: "Reliable Delivery", d: "Nationwide, cold-chain ready." },
                { t: "Customer-First Support", d: "Dedicated account managers." },
              ].map((v) => (
                <div key={v.t} className="border-b border-border py-4 sm:odd:border-r sm:odd:pr-5 sm:even:pl-5 sm:[&:nth-last-child(-n+2)]:border-b-0">
                  <dt className="font-display text-sm font-bold text-brand">{v.t}</dt>
                  <dd className="mt-1 text-xs text-muted-foreground">{v.d}</dd>
                </div>
              ))}
            </dl>
            <Link to="/about" className="mt-10 inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-brand to-brand/80 px-6 py-3 text-sm font-semibold text-brand-foreground shadow-lg transition hover:brightness-110">
              Learn more about us →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us — stats layout */}
      <WhyChooseUsSection />

      {/* Brand Partnerships */}
      <PartnershipsSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA */}
      <section className="bg-topbar text-topbar-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 py-20 md:grid-cols-[1fr_auto]">
          <div>
            <div className="text-xs font-bold uppercase">Let's Talk</div>
            <h2 className="mt-5 font-display text-3xl font-bold md:text-5xl">Ready to equip <span className="block font-normal text-topbar-foreground/70">your facility?</span></h2>
            <p className="mt-2 text-brand-foreground/80">Tailored quotes, bulk orders and technical advice — from a team that answers within the hour.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <WhatsAppButton />
          </div>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}

const TESTIMONIALS = [
  {
    quote:
      "Zentramed has been our go-to partner for theatre consumables for over three years. Their response time and product quality are simply unmatched in the region.",
    name: "Dr. Aisha Wanjiru",
    role: "Medical Director, Nairobi Surgical Centre",
    initials: "AW",
    avatar: "/avatar-woman-1.webp",
  },
  {
    quote:
      "We equipped a 60-bed county hospital with Zentramed — from beds to imaging. Installation was seamless and their after-sales support is world-class.",
    name: "Eng. Peter Kimani",
    role: "Biomedical Lead, County Health Services",
    initials: "PK",
    avatar: "/avatar-man-1.webp",
  },
  {
    quote:
      "Reliable, transparent and fast. Zentramed supplied a full humanitarian PPE order for our field mission in under a week. A truly professional team.",
    name: "Sarah Odhiambo",
    role: "Logistics Coordinator, International NGO",
    initials: "SO",
    avatar: "/avatar-woman-2.webp",
  },
  {
    quote:
      "Their lab team helped us specify, install and train our staff on new hematology analyzers. The precision and follow-through is exceptional.",
    name: "Dr. Michael Otieno",
    role: "Head of Laboratory, Regional Referral Hospital",
    initials: "MO",
    avatar: "/avatar-man-2.webp",
  },
];

function TestimonialsSection() {
  // Duplicate for seamless marquee loop
  const loop = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <section className="relative overflow-hidden bg-muted/40 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-accent">
            <span className="h-px w-10 bg-accent" /> Trusted by Healthcare Leaders <span className="h-px w-10 bg-accent" />
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold text-brand md:text-5xl">
            What our clients say
          </h2>
        </div>

        {/* Animated marquee of client "passports" */}
        <div
          className="group relative mt-14 overflow-hidden"
          style={{
            maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="flex w-max gap-6 animate-[marquee_40s_linear_infinite] group-hover:[animation-play-state:paused]">
            {loop.map((t, i) => (
              <article
                key={i}
                className="w-[320px] shrink-0 rounded-2xl bg-background p-6 shadow-sm ring-1 ring-border md:w-[380px]"
              >
                <div className="flex items-center gap-3 border-b border-dashed border-border pb-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-brand to-topbar p-0.5 ring-2 ring-accent/40 transition group-hover:scale-105">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      loading="eager"
                      decoding="async"
                      width={56}
                      height={56}
                      className="h-full w-full rounded-full bg-background object-cover object-top transition duration-500 hover:rotate-6"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 grid h-4 w-4 place-items-center rounded-full bg-[#25D366] ring-2 ring-background">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-display text-sm font-semibold text-brand">{t.name}</div>
                    <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{t.role}</div>
                  </div>
                  <span className="rounded border border-accent/40 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-accent">
                    Verified
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">"{t.quote}"</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-6 border-t border-border pt-10 sm:grid-cols-3">
          {[
            { value: 150, suffix: "+", label: "Hospitals & clinics served" },
            { value: 40, suffix: "+", label: "NGO & humanitarian partners" },
            { value: 98, suffix: "%", label: "On-time delivery rate" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-4xl font-bold text-brand md:text-6xl">
                <CountUp end={s.value} />{s.suffix}
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CountUp({ end, duration = 1800 }: { end: number; duration?: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(end * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [end, duration]);

  return <span ref={ref} className="tabular-nums">{n.toLocaleString()}</span>;
}


function PartnershipsSection() {
  return (
    <section className="bg-muted/30 py-16">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <div className="text-xs font-bold uppercase text-accent">Global Manufacturers</div>
        <h2 className="mt-3 font-display text-3xl font-bold text-brand md:text-4xl">Our Brand Partnerships</h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">We partner with ISO-certified global manufacturers to bring you trusted medical technology.</p>
      </div>
      <div className="group mt-10 overflow-hidden">
        <div className="flex w-max gap-6 animate-partner-marquee group-hover:[animation-play-state:paused]">
          {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, index) => (
            <div key={index} className="flex h-24 w-44 shrink-0 items-center justify-center rounded-lg border border-border bg-background px-6 shadow-sm">
              <img src={logo} alt="Partner brand logo" loading="lazy" decoding="async" className="max-h-14 max-w-full object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseUsSection() {
  const stats = [
    { value: 15, suffix: "+", label: "Years" },
    { value: 2500, suffix: "+", label: "Happy Clients" },
    { value: 500, suffix: "+", label: "Products" },
    { value: 5, suffix: "", label: "Countries" },
  ];
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-xs font-bold uppercase text-accent">Why Choose Us</div>
        <h2 className="mt-5 font-display text-3xl font-bold text-brand md:text-5xl">Depth, scale <span className="block font-normal text-muted-foreground">and follow-through.</span></h2>
        <p className="mt-6 max-w-5xl text-muted-foreground md:text-lg">
          As a trusted supplier of{" "}
          <span className="font-semibold text-accent">end-to-end medical equipment and solutions</span>{" "}
          across East Africa, Zentramed Health is your comprehensive source for healthcare supplies.
          Whether you're outfitting a rural clinic, equipping a referral hospital or managing a
          humanitarian program, our depth of experience and adaptability allow us to meet healthcare
          demands at every scale. With operations reaching five countries and a dedicated team of
          specialists and biomedical engineers, we strive to be your trusted partner in delivering
          superior care through timely, high-quality solutions.
        </p>

        <div className="mt-14 grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-5xl font-extrabold text-accent md:text-6xl">
                <CountUp end={s.value} />{s.suffix}
              </div>
              <div className="mt-3 font-display text-sm font-bold uppercase tracking-widest text-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

