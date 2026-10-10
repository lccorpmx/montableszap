import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { MexicoMap } from "@/components/sections/mexico-map"
import { buttonVariants } from "@/components/ui/button"
import { images } from "@/lib/images"
import { reveal } from "@/lib/motion"
import { whatsappUrl } from "@/lib/site"
import { cn } from "@/lib/utils"

export function Shipping() {
  return (
    <section id="envios" aria-labelledby="envios-title" className="relative overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <div {...reveal("fade")} className="relative aspect-4/3 sm:aspect-video lg:aspect-auto lg:min-h-144">
          <Image
            src={images.envios.tienda}
            alt="Fachada de la tienda Montables ZAP con un montable tipo Razer en la entrada"
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-[60%_center] lg:object-[35%_center]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-background via-transparent via-30% to-transparent lg:bg-linear-to-r lg:from-transparent lg:via-transparent lg:via-70% lg:to-background"
          />
        </div>

        <div className="flex flex-col justify-center px-4 py-14 sm:px-6 lg:py-20 lg:pr-8 lg:pl-12 xl:pl-16">
          <div className="w-full max-w-xl">
            <h2
              id="envios-title"
              {...reveal()}
              className="font-display text-4xl leading-[0.95] tracking-tight text-balance uppercase sm:text-5xl"
            >
              Envíos a toda <br className="hidden sm:block" />
              la república
            </h2>
            <p {...reveal("up", 100)} className="mt-4 max-w-sm text-lg leading-relaxed text-muted-foreground">
              Tu montable llega seguro y directo a la puerta de tu casa.
            </p>

            <MexicoMap className="mt-8 max-w-lg" />

            <div {...reveal()} className="mt-8">
              <a
                href={whatsappUrl("¡Hola Montables ZAP! ¿Hacen envíos a mi ciudad?")}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 rounded-full px-5 font-semibold"
                )}
              >
                Pregunta por el envío a tu ciudad
                <ArrowRight data-icon="inline-end" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
