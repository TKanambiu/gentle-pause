import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import dialysis from "@/assets/heroes/dialysis.webp.asset.json";

const FEATURED = [
  { name: "WT-T6000S Hemodialysis", category: "Free placement programme", image: dialysis.url, hash: "dialysis" },
  { name: "VQ-200 Real-Time PCR", category: "Molecular diagnostics", image: "/featured/vq200-qpcr.jpg", hash: "qpcr" },
  { name: "KHB HIV (1+2) Rapid Test", category: "Rapid testing", image: "/featured/hiv-kit.jpg", hash: "hiv" },
  { name: "AST-1000 Workstation", category: "Ophthalmic equipment", image: "/featured/ast-1000-poster.jpg", hash: "ophthalmic" },
];

export function FeaturedMarquee() {
  const [paused, setPaused] = useState(false);
  return (
    <section aria-labelledby="featured-heading" className="overflow-hidden border-y border-border bg-featured-soft py-14">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 text-xs font-bold uppercase text-brand"><span className="h-px w-10 bg-brand" /> Equipment & Programmes</div>
            <h2 id="featured-heading" className="mt-3 font-display text-3xl font-bold text-brand md:text-4xl">Featured Products</h2>
          </div>
          <Link to="/featured-products" className="inline-flex items-center gap-2 text-sm font-semibold text-brand">View featured products <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
        <div className="group mt-10 overflow-hidden" role="region" aria-label="Featured product carousel" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}>
          <div className={`featured-track flex w-max gap-6 py-2 ${paused ? "featured-track-paused" : ""}`}>
            {[0, 1, 2, 3].flatMap((copy) => FEATURED.map((product) => (
              <Link key={`${copy}-${product.hash}`} to="/featured-products" hash={product.hash} tabIndex={copy === 0 ? 0 : -1} aria-hidden={copy !== 0 ? true : undefined} className="group/product block w-[280px] shrink-0 overflow-hidden rounded-lg border border-border bg-background shadow-sm md:w-[320px]">
                <div className="aspect-[4/3] overflow-hidden bg-background"><img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-contain transition-transform duration-500 group-hover/product:scale-105" /></div>
                <div className="min-h-28 border-t border-border bg-brand px-5 py-4 text-brand-foreground">
                  <p className="text-xs text-brand-foreground/75">{product.category}</p>
                  <div className="mt-2 flex items-start justify-between gap-3"><h3 className="font-display text-lg font-semibold leading-tight">{product.name}</h3><ArrowUpRight className="mt-0.5 h-5 w-5 shrink-0" /></div>
                </div>
              </Link>
            )))}
          </div>
        </div>
      </div>
    </section>
  );
}