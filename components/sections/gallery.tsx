import { MediaShowcase } from "@/components/sections/media-showcase"
import { gallery } from "@/lib/content"

export function Gallery() {
  return (
    <section
      id="galeria"
      aria-labelledby="galeria-title"
      className="relative isolate overflow-hidden border-t border-white/5 py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 -z-10 w-2/3 bg-[radial-gradient(ellipse_at_top_right,color-mix(in_oklch,var(--color-primary)_16%,transparent),transparent_60%)]"
      />
      <div className="container">
        <MediaShowcase
          items={gallery}
          header={
            <div>
              <h2
                id="galeria-title"
                className="font-display leading-[0.85] tracking-tight uppercase italic"
              >
                <span className="block text-4xl sm:text-5xl">Así se vive</span>
                <span className="block text-5xl sm:text-6xl xl:text-7xl">
                  Montables <span className="text-primary">Zap</span>
                </span>
              </h2>
              <p className="mt-4 max-w-sm font-heading text-lg leading-snug font-medium tracking-wide text-muted-foreground uppercase">
                Revisa nuestros videos, modelos y entregas reales.
              </p>
            </div>
          }
        />
      </div>
    </section>
  )
}
