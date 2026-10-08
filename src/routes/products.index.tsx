import { OptimizedImage } from "@/components/optimized-image";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { whatsappLink } from "@/lib/whatsapp";
import { PageHero } from "./about";
import { formatKES } from "@/data/catalogue";
import { useLiveCategories } from "@/lib/live-catalogue";
import { useEffect, useMemo, useState } from "react";
import { Search, MessageCircle, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/products/")({
  validateSearch: (s: Record<string, unknown>): { q?: string } => ({
    q: typeof s.q === "string" ? s.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Products | Zentramed Health Medical Supplies" },
      { name: "description", content: "Browse Zentramed Health's full catalogue — PPE, lab diagnostics, imaging, oxygen therapy, hospital furniture, neonatal & surgical theatre equipment." },
      { property: "og:title", content: "Zentramed Health Product Catalogue" },
      { property: "og:description", content: "Full catalogue of medical supplies and equipment." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const { q: initialQ } = Route.useSearch();
  const [q, setQ] = useState(initialQ ?? "");
  useEffect(() => { if (initialQ !== undefined) setQ(initialQ); }, [initialQ]);
  const CATEGORIES = useLiveCategories();
  const products = useMemo(() => CATEGORIES.flatMap((c) => c.subcategories.flatMap((s) => s.products.map((prod) => ({ ...prod, category: c.name, categorySlug: c.slug, categoryImage: c.image })))), [CATEGORIES]);
  const filtered = q
    ? products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()))
    : [];

  return (
    <div>
      <SiteHeader />
      <PageHero title="Product Catalogue" subtitle="9 categories · 500+ items · sourced from certified global brands" />
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-8 flex items-center gap-3 rounded-xl border-2 border-brand bg-background px-4 py-3 shadow-md ring-4 ring-brand/10 focus-within:ring-brand/25">
          <Search className="h-5 w-5 text-brand" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search for a product, brand or category…"
            className="w-full bg-transparent text-base font-medium outline-none placeholder:text-muted-foreground"
          />
        </div>


        {q && (
          <div className="mb-10 rounded-xl border border-border bg-muted/30 p-4">
            <div className="text-sm font-semibold text-brand">
              {filtered.length} result{filtered.length === 1 ? "" : "s"} for "{q}"
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.slice(0, 24).map((p) => (
                <Link
                  key={p.category + p.name}
                  to="/products/$slug"
                  params={{ slug: p.categorySlug }}
                  className="flex items-center gap-3 rounded-md bg-background p-3 text-sm transition hover:shadow"
                >
                  <OptimizedImage
                    src={p.image ?? p.categoryImage}
                    sizes="48px"
                    alt={p.name}
                    loading="lazy"
                    className={`h-12 w-12 shrink-0 rounded ${p.image ? "bg-white object-contain p-1" : "object-cover"}`}
                  />

                  <div className="min-w-0">
                    <div className="truncate font-semibold text-foreground">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.category}</div>
                    <div className="text-xs font-bold text-brand">{formatKES(p.price)}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to="/products/$slug"
              params={{ slug: c.slug }}
              className="group flex flex-col rounded-xl border border-border bg-background p-6 hover:border-brand hover:shadow-[var(--shadow-card)]"
            >
              <h3 className="font-display text-lg font-semibold text-brand">{c.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.tagline}</p>
              <div className="mt-4 text-xs text-muted-foreground">
                {c.subcategories.reduce((n, s) => n + s.products.length, 0)} items
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand group-hover:text-accent">
                Browse <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-14 rounded-xl bg-brand p-8 text-brand-foreground">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl font-bold">Can't find what you need?</h3>
              <p className="mt-1 text-brand-foreground/80">We source certified products globally on request.</p>
            </div>
            <a href={whatsappLink("Hello Zentramed Health, I need help sourcing a product.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 font-semibold text-accent-foreground hover:brightness-95">
              <MessageCircle className="h-4 w-4" /> WhatsApp us
            </a>
          </div>
        </div>
      </section>
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
