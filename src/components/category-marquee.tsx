import { OptimizedImage } from "@/components/optimized-image";
import { Link } from "@tanstack/react-router";
import type { Category } from "@/data/catalogue";

type Props = { categories: Category[] };

/**
 * Continuously scrolling category strip. Shows multiple cards at once —
 * image on top with a bold green label bar below (like a display board).
 * Pauses on hover so users can click a category.
 */
export function CategoryMarquee({ categories }: Props) {
  const loop = [...categories, ...categories];
  return (
    <div className="group relative overflow-hidden">
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-muted/40 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-muted/40 to-transparent" />

      <div
        className="flex w-max animate-cat-marquee gap-6 py-2 [animation-play-state:running] group-hover:[animation-play-state:paused]"
      >
        {loop.map((c, idx) => (
          <Link
            key={`${c.slug}-${idx}`}
            to="/products/$slug"
            params={{ slug: c.slug }}
            className="group/card relative block w-[280px] shrink-0 overflow-hidden rounded-lg bg-background shadow-md ring-1 ring-border transition hover:-translate-y-1 hover:shadow-xl md:w-[320px]"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <OptimizedImage
                src={c.image}
                sizes="(min-width: 768px) 320px, 280px"
                alt={c.name}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover/card:scale-105"
              />
            </div>
            <div className="bg-brand px-5 py-4 text-brand-foreground">
              <div className="font-display text-lg font-semibold leading-tight md:text-xl">
                {c.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}