import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { WhatsAppIcon } from "@/components/icons"
import { SectionHeading } from "@/components/section-heading"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { featuredProduct as product } from "@/lib/content"
import { reveal } from "@/lib/motion"
import { whatsappUrl } from "@/lib/site"
import { cn } from "@/lib/utils"

export function Products() {
  return (
    <section id="montables" aria-labelledby="montables-title" className="py-16 sm:py-20 lg:py-24">
      <div className="container">
        <SectionHeading
          id="montables-title"
          title="Nuestros montables"
          description="Diversión, seguridad y calidad en un solo lugar"
        />

        <Card className="group mt-10 gap-0 py-0 lg:grid lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          {/* Escaparate para el recorte PNG: foco de luz, brillo de marca al hover y sombra de piso. */}
          <div
            {...reveal("scale")}
            className="relative aspect-4/3 overflow-hidden bg-[radial-gradient(ellipse_at_50%_45%,color-mix(in_oklch,var(--color-foreground)_12%,transparent),transparent_70%)] lg:aspect-auto lg:min-h-112"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,color-mix(in_oklch,var(--color-primary)_35%,transparent),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-[18%] bottom-[9%] h-[7%] rounded-[50%] bg-black/70 blur-md transition-transform duration-500 ease-out-expo group-hover:scale-x-90"
            />
            <Image
              src={product.image}
              alt={product.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1280px) 680px, (min-width: 1024px) 55vw, 100vw"
              className="object-contain p-6 drop-shadow-xl transition-[translate,scale] duration-500 ease-out-expo group-hover:-translate-y-1.5 group-hover:scale-105 motion-reduce:transition-none sm:p-10"
            />
          </div>

          <div className="flex flex-col justify-center gap-5 border-t border-white/5 p-6 sm:p-8 lg:border-t-0 lg:border-l lg:p-12">
            <div {...reveal("up", 120)}>
              <p className="font-heading text-sm font-semibold tracking-widest text-muted-foreground uppercase">
                {product.eyebrow}
              </p>
              <h3 className="mt-1 font-display text-5xl leading-none tracking-tight uppercase sm:text-6xl">
                {product.name}
              </h3>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            </div>

            <div {...reveal("up", 220)} className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={whatsappUrl("¡Hola Montables ZAP! Me interesan los Razers, ¿qué modelos tienen disponibles?")}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 px-6 text-base font-semibold shadow-lg shadow-primary/20"
                )}
              >
                <WhatsAppIcon className="size-5" />
                Cotizar Razers
              </a>
              <a
                href={whatsappUrl("¡Hola Montables ZAP! Quiero ver el catálogo completo de modelos.")}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 px-6 text-base font-semibold"
                )}
              >
                Ver todos los modelos
                <ArrowRight data-icon="inline-end" />
              </a>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
