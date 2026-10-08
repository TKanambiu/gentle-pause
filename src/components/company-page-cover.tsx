import { Link } from "@tanstack/react-router";
import { OptimizedImage } from "@/components/optimized-image";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export function CompanyPageCover({ image, imageAlt, label, title, description }: { image: string; imageAlt: string; label: string; title: string; description: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-photo-overlay text-brand-foreground">
      <OptimizedImage src={image} alt={imageAlt} sizes="100vw" loading="eager" fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-photo-overlay/65" />
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-10 md:py-16 lg:px-12 lg:py-20">
        <div className="flex items-center gap-3 text-xs font-semibold uppercase"><span className="h-px w-8 bg-brand-foreground/60" />{label}</div>
        <h1 className="mt-5 max-w-3xl font-editorial text-4xl font-semibold leading-tight md:text-5xl">{title}</h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-brand-foreground/90 md:text-lg">{description}</p>
        <Button asChild variant="secondary" size="lg" className="mt-7"><Link to="/contact">Talk to our team <ArrowUpRight /></Link></Button>
      </div>
    </section>
  );
}