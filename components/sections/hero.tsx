import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/icons"
import { HeroScene } from "@/components/sections/hero-scene"
import { buttonVariants } from "@/components/ui/button"
import { heroHighlights } from "@/lib/content"
import { delay } from "@/lib/motion"
import { siteConfig, whatsappUrl } from "@/lib/site"
import { cn } from "@/lib/utils"

const socials = [
  { ...siteConfig.social.tiktok, Icon: TikTokIcon },
  { ...siteConfig.social.instagram, Icon: InstagramIcon },
]

// Above the fold: animaciones de carga solo con CSS, no esperan a la hidratación.
const enter = "motion-safe:animate-enter"

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <HeroScene />

      <div className="container relative -mt-20 pb-14 sm:-mt-28 lg:mt-0 lg:flex lg:min-h-[min(46rem,calc(100dvh-4rem))] lg:items-center lg:py-20">
        <div className="max-w-xl">
          <h1 id="hero-title">
            <span className={cn("block font-display text-[clamp(3.5rem,15vw,5rem)] leading-[0.82] tracking-tight uppercase lg:text-[clamp(5rem,8vw,7rem)]", enter)}>
              Montables
            </span>
            <span
              style={delay(90)}
              className={cn("block font-display text-[clamp(5rem,24vw,8rem)] leading-[0.82] tracking-tight text-primary uppercase italic lg:text-[clamp(8rem,13vw,11rem)]", enter)}
            >
              Zap
            </span>
            <span
              style={delay(180)}
              className={cn("mt-5 block font-heading text-2xl leading-tight font-semibold tracking-wide text-balance uppercase sm:text-3xl", enter)}
            >
              Montables eléctricos <br className="hidden sm:block" />
              para toda la familia
            </span>
          </h1>

          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-4">
            {heroHighlights.map(({ icon: Icon, title }, index) => (
              <li key={title} style={delay(280 + index * 70)} className={cn("flex items-center gap-2.5", enter)}>
                <Icon className="size-7 shrink-0 stroke-[1.5]" aria-hidden="true" />
                <span className="max-w-24 font-heading text-sm leading-tight font-medium tracking-wide uppercase">
                  {title}
                </span>
              </li>
            ))}
          </ul>

          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            style={delay(480)}
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-8 h-auto gap-3.5 rounded-xl py-3 pr-6 pl-4 shadow-xl shadow-primary/25 hover:bg-primary/90",
              enter
            )}
          >
            <WhatsAppIcon className="size-8" />
            <span className="flex flex-col items-start text-left">
              <span className="text-xs font-semibold tracking-widest text-primary-foreground/85 uppercase">
                Cotiza por WhatsApp
              </span>
              <span className="font-heading text-2xl leading-tight font-bold tracking-wide tabular-nums">
                {siteConfig.phone.display}
              </span>
            </span>
          </a>

          <ul className="mt-6 flex flex-col gap-1">
            {socials.map(({ label, handle, href, Icon }, index) => (
              <li key={label} style={delay(580 + index * 70)} className={enter}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-11 items-center gap-3 rounded-md font-heading text-lg font-semibold tracking-wide uppercase outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <Icon className="size-6" />
                  <span className="underline-offset-4 group-hover:underline">
                    <span className="sr-only">{label}: </span>
                    {handle}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
