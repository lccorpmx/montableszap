"use client"

import { useRef, useState, type MouseEvent } from "react"
import { ChevronRight, MenuIcon } from "lucide-react"

import { Logo } from "@/components/brand/logo"
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/icons"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { siteConfig, whatsappUrl } from "@/lib/site"
import { cn } from "@/lib/utils"

export function MobileNav({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)
  // Se hace scroll hasta que el Sheet termina de cerrarse y libera el scroll-lock.
  const pendingHash = useRef<string | null>(null)

  function handleNavigate(event: MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault()
    pendingHash.current = href
    setOpen(false)
  }

  function handleOpenChangeComplete(isOpen: boolean) {
    const hash = pendingHash.current
    if (isOpen || !hash) return
    pendingHash.current = null
    document.querySelector(hash)?.scrollIntoView()
    history.pushState(null, "", hash)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen} onOpenChangeComplete={handleOpenChangeComplete}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon-lg"
            className={cn("size-11", className)}
            aria-label="Abrir menú"
          />
        }
      >
        <MenuIcon className="size-6" />
      </SheetTrigger>

      <SheetContent side="right" className="w-[85%] max-w-sm gap-0 bg-card">
        <SheetHeader className="border-b px-5 py-4">
          <SheetTitle>
            <Logo className="text-xl" />
          </SheetTitle>
          <SheetDescription className="sr-only">Navegación del sitio</SheetDescription>
        </SheetHeader>

        <nav aria-label="Móvil" className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="flex flex-col gap-1">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(event) => handleNavigate(event, item.href)}
                  className="flex h-12 items-center justify-between rounded-lg px-3 font-heading text-lg font-semibold tracking-wide uppercase transition-colors outline-none hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {item.label}
                  <ChevronRight className="size-5 text-muted-foreground" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <SheetFooter className="gap-4 border-t px-5 py-5">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "lg" }), "h-12 w-full text-base font-semibold")}
          >
            <WhatsAppIcon className="size-5" />
            Cotiza por WhatsApp
          </a>
          <div className="flex justify-center gap-2">
            {[
              { ...siteConfig.social.tiktok, Icon: TikTokIcon },
              { ...siteConfig.social.instagram, Icon: InstagramIcon },
            ].map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${siteConfig.name} en ${label}`}
                className={cn(buttonVariants({ variant: "ghost", size: "icon-lg" }), "size-11")}
              >
                <Icon className="size-5" />
              </a>
            ))}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
