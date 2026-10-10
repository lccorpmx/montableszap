import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { reveal } from "@/lib/motion"
import { siteConfig, whatsappUrl } from "@/lib/site"
import { cn } from "@/lib/utils"

const contactLinks = [
  { label: "WhatsApp", text: siteConfig.phone.display, href: whatsappUrl(), Icon: WhatsAppIcon },
  { ...siteConfig.social.tiktok, text: siteConfig.social.tiktok.handle, Icon: TikTokIcon },
  { ...siteConfig.social.instagram, text: siteConfig.social.instagram.handle, Icon: InstagramIcon },
]

const headingClass =
  "font-heading text-sm font-semibold tracking-widest text-muted-foreground uppercase"

export function SiteFooter() {
  return (
    <footer id="contacto" aria-labelledby="contacto-title" className="border-t border-white/10 bg-card/50">
      <div className="container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_0.8fr_auto] lg:gap-12">
        <div {...reveal()}>
          <p className="font-display text-5xl leading-[0.85] tracking-tight uppercase">
            Montables
            <span className="block text-primary italic">Zap</span>
          </p>
          <p className="mt-4 max-w-xs text-base text-muted-foreground">
            Montables eléctricos de la mejor calidad. Diversión para todas las edades.
          </p>
        </div>

        <div {...reveal("up", 80)}>
          <h2 id="contacto-title" className={headingClass}>
            Contacto
          </h2>
          <ul className="mt-3">
            {contactLinks.map(({ label, text, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-11 items-center gap-3 rounded-md font-heading text-lg font-semibold tracking-wide uppercase outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <Icon className="size-5 shrink-0" />
                  <span className="underline-offset-4 group-hover:underline">
                    <span className="sr-only">{label}: </span>
                    {text}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-labelledby="footer-nav-title" {...reveal("up", 160)}>
          <h2 id="footer-nav-title" className={headingClass}>
            Navegación
          </h2>
          <ul className="mt-3 grid grid-cols-2 sm:grid-cols-1">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex min-h-10 items-center rounded-md text-base text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div {...reveal("up", 240)} className="sm:col-span-2 lg:col-span-1">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 px-5 text-base font-semibold shadow-lg shadow-primary/20"
            )}
          >
            <WhatsAppIcon className="size-5" />
            Cotiza por WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-white/5 pb-20 sm:pb-0">
        <p className="container py-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
