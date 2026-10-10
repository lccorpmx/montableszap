import { Logo } from "@/components/brand/logo"
import { WhatsAppIcon } from "@/components/icons"
import { MainNav } from "@/components/layout/main-nav"
import { MobileNav } from "@/components/layout/mobile-nav"
import { buttonVariants } from "@/components/ui/button"
import { siteConfig, whatsappUrl } from "@/lib/site"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-background/85 backdrop-blur-md supports-backdrop-filter:bg-background/70">
      <div className="container flex h-16 items-center justify-between gap-6">
        <a
          href="#inicio"
          aria-label={`${siteConfig.name}, ir al inicio`}
          className="rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <Logo className="text-xl sm:text-2xl" />
        </a>

        <MainNav className="hidden lg:block" />

        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ size: "lg" }),
              "hidden h-10 px-4 font-semibold shadow-lg shadow-primary/20 sm:inline-flex"
            )}
          >
            <WhatsAppIcon className="size-4" />
            Cotiza por WhatsApp
          </a>
          <MobileNav className="lg:hidden" />
        </div>
      </div>
    </header>
  )
}
