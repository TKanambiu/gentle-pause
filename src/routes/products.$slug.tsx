import { OptimizedImage } from "@/components/optimized-image";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { whatsappLink } from "@/lib/whatsapp";
import { getCategory, COMPANY, CATEGORIES, formatKES, type Category } from "@/data/catalogue";
import { ChevronRight, MessageCircle, Search as SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useLiveCategories } from "@/lib/live-catalogue";

export const Route = createFileRoute("/products/$slug")({
  validateSearch: (s: Record<string, unknown>): { q?: string } => ({
    q: typeof s.q === "string" ? s.q : undefined,
  }),
  loader: ({ params }): { category: Category } => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.category.name} | Zentramed Health` },
          { name: "description", content: loaderData.category.description },
          { property: "og:title", content: `${loaderData.category.name} | Zentramed Health` },
          { property: "og:description", content: loaderData.category.description },
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="p-10 text-center">
      Category not found. <Link to="/products" className="text-accent underline">Back to products</Link>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="p-10 text-center">
      Something went wrong. <button onClick={reset} className="text-accent underline">Retry</button>
    </div>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { category: staticCategory } = Route.useLoaderData() as { category: Category };
  const live = useLiveCategories();
  const category = live.find((c) => c.slug === staticCategory.slug) ?? staticCategory;
  const { q: initialQ } = Route.useSearch();
  const [q, setQ] = useState(initialQ ?? "");
  useEffect(() => { if (initialQ !== undefined) setQ(initialQ); }, [initialQ]);
  const totalItems = category.subcategories.reduce((n, s) => n + s.products.length, 0);
  const query = q.trim().toLowerCase();

  return (
    <div>
      <SiteHeader />

      {/* Category hero — named after the category itself */}
      <section className="relative overflow-hidden bg-brand text-brand-foreground">
        <OptimizedImage
          src={category.image}
          loading="eager"
          fetchPriority="high"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-accent">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/products" className="hover:text-white">Catalogue</Link>
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl">
            {category.name}
          </h1>
          <p className="mt-4 max-w-2xl text-white/85 md:text-lg">{category.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-full bg-white/10 px-3 py-1.5 font-semibold backdrop-blur">
              {totalItems} items
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1.5 font-semibold backdrop-blur">
              {category.subcategories.length} ranges
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">
            <div className="font-display font-semibold text-brand">All Categories</div>
            <ul className="mt-3 space-y-1 text-sm">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    to="/products/$slug"
                    params={{ slug: c.slug }}
                    className="block rounded px-3 py-2 hover:bg-muted"
                    activeProps={{ className: "block rounded px-3 py-2 bg-brand text-brand-foreground" }}
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          <div>
            <div className="mb-8 flex items-center gap-3 rounded-xl border-2 border-brand bg-background px-4 py-3 shadow-sm ring-4 ring-brand/10 focus-within:ring-brand/25">
              <SearchIcon className="h-5 w-5 text-brand" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={`Search within ${category.name}…`}
                className="w-full bg-transparent text-base font-medium outline-none placeholder:text-muted-foreground"
              />
              {q && (
                <button onClick={() => setQ("")} className="text-xs font-semibold text-muted-foreground hover:text-brand">Clear</button>
              )}
            </div>
            {category.subcategories.map((sub, si) => {
              const items = query
                ? sub.products.filter((p) => p.name.toLowerCase().includes(query))
                : sub.products;
              if (query && items.length === 0) return null;
              return (
                <div key={sub.name} className={si === 0 ? "" : "mt-14"}>
                  <div className="flex items-baseline justify-between gap-4 border-b-2 border-brand/20 pb-3">
                    <h2 className="font-display text-2xl font-bold text-brand">{sub.name}</h2>
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      {items.length} products
                    </span>
                  </div>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((prod) => (
                      <div
                        key={prod.name}
                        className="group flex flex-col overflow-hidden rounded-xl border border-border bg-background transition hover:-translate-y-1 hover:border-brand hover:shadow-[var(--shadow-card)]"
                      >
                        <div className={`relative aspect-[4/3] overflow-hidden ${prod.image ? "bg-white p-4" : "bg-muted"}`}>
                          <OptimizedImage
                            src={prod.image ?? category.image}
                            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                            alt={prod.name}
                            loading="lazy"
                            width={800}
                            height={600}
                            className={`h-full w-full transition duration-500 group-hover:scale-105 ${prod.image ? "object-contain" : "object-cover brightness-110"}`}
                          />
                          {!prod.image && (
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/35 to-transparent" />
                          )}
                          <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-brand shadow">
                            {sub.name}
                          </div>
                        </div>
                        <div className="flex flex-1 flex-col p-4">
                          <div className="font-display text-base font-semibold text-foreground">
                            {prod.name}
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">{category.name}</div>
                          <div className="mt-3 flex items-end justify-between gap-2">
                            <div>
                              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                Retail price
                              </div>
                              <div className="font-display text-lg font-bold text-brand">
                                {formatKES(prod.price)}
                              </div>
                            </div>
                            {prod.reseller !== undefined && prod.reseller < prod.price && (
                              <div className="rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-bold text-accent">
                                Trade {formatKES(prod.reseller)}
                              </div>
                            )}
                          </div>
                          <a
                            href={whatsappLink(`Hi Zentramed Health, please send me a quote for: ${prod.name} (${formatKES(prod.price)}).`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-md bg-brand px-3 py-2 text-xs font-bold text-brand-foreground transition hover:bg-accent hover:text-accent-foreground"
                          >
                            <svg viewBox="0 0 32 32" className="h-4 w-4 fill-current" aria-hidden="true"><path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.303.245-.687.245-1.017 0-.187-.13-.317-.315-.416-.516-.259-.63-.359-1.36-.674-.144-.058-.317-.087-.489-.087Z"/><path d="M16.005 0C7.234 0 .137 7.099.137 15.87c0 2.973.816 5.762 2.234 8.135L0 32l8.235-2.63a15.826 15.826 0 0 0 7.77 1.976c8.77 0 15.868-7.099 15.868-15.87S24.775 0 16.005 0Zm0 28.86a13.058 13.058 0 0 1-7.084-2.078L4.104 28.32l1.564-4.616a13.062 13.062 0 0 1-2.503-7.706c0-7.245 5.899-13.144 13.144-13.144s13.144 5.899 13.144 13.144-5.9 13.858-13.448 13.858Z"/></svg> Order via WhatsApp
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            {query &&
              category.subcategories.every(
                (s) => s.products.filter((p) => p.name.toLowerCase().includes(query)).length === 0,
              ) && (
                <div className="rounded-xl border border-border bg-muted/30 p-10 text-center text-muted-foreground">
                  No products in {category.name} match "{q}".
                </div>
              )}
          </div>
        </div>
      </section>
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
