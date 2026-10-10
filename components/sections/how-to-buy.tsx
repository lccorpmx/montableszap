import Image from "next/image"
import { ChevronRight } from "lucide-react"

import { WhatsAppIcon } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { purchaseSteps } from "@/lib/content"
import { images } from "@/lib/images"
import { delay, reveal } from "@/lib/motion"
import { whatsappUrl } from "@/lib/site"
import { cn } from "@/lib/utils"

// Coreografía: cada paso entra 380 ms después del anterior; el conector aparece
// justo antes del siguiente paso, y al final llegan el CTA y la mascota.
const FIRST_STEP_MS = 250
const STEP_INTERVAL_MS = 380
const stepAt = (index: number, offset = 0) => FIRST_STEP_MS + index * STEP_INTERVAL_MS + offset
const SEQUENCE_END_MS = stepAt(purchaseSteps.length)

const fadeUp =
  "transition-[opacity,translate] duration-700 ease-out-expo delay-(--delay) pre-reveal:translate-y-4 pre-reveal:opacity-0"

export function HowToBuy() {
  return (
    <section
      id="como-comprar"
      aria-labelledby="como-comprar-title"
      className="relative isolate overflow-hidden bg-primary text-primary-foreground"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-br from-brand-deep via-primary to-primary"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[repeating-linear-gradient(135deg,transparent_0_22px,rgb(255_255_255/0.04)_22px_24px)]"
      />

      <div
        {...reveal("group")}
        className="group/steps container grid gap-10 py-16 sm:py-20 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-6"
      >
        <div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2
                id="como-comprar-title"
                className={cn(
                  "font-display text-4xl leading-[0.95] tracking-tight text-balance uppercase sm:text-5xl",
                  fadeUp
                )}
              >
                ¿Cómo comprar?
              </h2>
              <p
                style={delay(80)}
                className={cn("mt-2 font-heading text-lg font-semibold tracking-wide text-white/90 uppercase", fadeUp)}
              >
                Es muy fácil, en solo 4 pasos
              </p>
            </div>

            {/* Móvil/tablet: la mascota de la cintura hacia arriba junto al título. */}
            <div
              style={delay(200)}
              className="relative aspect-606/770 w-24 shrink-0 mask-b-from-70% transition-[opacity,translate,rotate] duration-700 ease-spring delay-(--delay) pre-reveal:translate-y-4 pre-reveal:rotate-12 pre-reveal:opacity-0 sm:w-32 lg:hidden"
            >
              <Image
                src={images.brand.mascota}
                alt=""
                fill
                sizes="8rem"
                className="object-cover object-top drop-shadow-xl"
              />
            </div>
          </div>

          <ol className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
            {purchaseSteps.map(({ icon: Icon, title, description }, index) => (
              <li
                key={title}
                style={delay(stepAt(index))}
                className="relative flex flex-col items-center rounded-xl bg-black/35 px-4 py-6 text-center ring-1 ring-white/10 backdrop-blur-sm transition-[opacity,translate,scale] duration-700 ease-spring delay-(--delay) pre-reveal:translate-y-6 pre-reveal:scale-90 pre-reveal:opacity-0"
              >
                <span
                  style={delay(stepAt(index, 120))}
                  className="relative grid size-14 place-items-center rounded-full bg-white/10 ring-1 ring-white/15 transition-[scale] duration-500 ease-spring delay-(--delay) pre-reveal:scale-50"
                >
                  <Icon className="size-7" aria-hidden="true" />
                  <span
                    aria-hidden="true"
                    style={delay(stepAt(index, 280))}
                    className="absolute inset-0 rounded-full opacity-0 ring-2 ring-white motion-safe:group-data-revealed/steps:animate-ping-once"
                  />
                </span>
                <h3 className="mt-4 font-heading text-xl leading-tight font-bold tracking-wide uppercase">
                  <span className="tabular-nums">{index + 1}.</span> {title}
                </h3>
                <p className="mt-1.5 text-sm leading-snug text-white/85 sm:text-base">{description}</p>

                {index < purchaseSteps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    style={delay(stepAt(index, 260))}
                    className="absolute top-1/2 -right-6 z-10 hidden size-6 -translate-y-1/2 place-items-center rounded-full bg-white text-primary shadow-lg shadow-black/30 transition-[opacity,scale,translate] duration-500 ease-spring delay-(--delay) pre-reveal:-translate-x-2 pre-reveal:scale-0 pre-reveal:opacity-0 lg:grid"
                  >
                    <ChevronRight className="size-4" strokeWidth={3} />
                  </span>
                ) : null}
              </li>
            ))}
          </ol>

          <div style={delay(SEQUENCE_END_MS)} className={cn("mt-8", fadeUp)}>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 bg-white px-6 text-base font-semibold text-primary shadow-xl shadow-black/20 hover:bg-white/90"
              )}
            >
              <WhatsAppIcon className="size-5" />
              Empezar mi cotización
            </a>
          </div>
        </div>

        {/* La mascota "pisa" el borde inferior de la sección (compensa el py-20). */}
        <div
          style={delay(stepAt(purchaseSteps.length - 1, 350))}
          className="hidden transition-[opacity,translate,rotate] duration-1000 ease-spring delay-(--delay) pre-reveal:translate-y-16 pre-reveal:rotate-12 pre-reveal:opacity-0 lg:-mb-20 lg:block"
        >
          <Image
            src={images.brand.mascota}
            alt=""
            sizes="15rem"
            className="w-52 drop-shadow-2xl xl:w-60"
          />
        </div>
      </div>
    </section>
  )
}
