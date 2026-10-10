import { WhatsAppIcon } from "@/components/icons"
import { whatsappUrl } from "@/lib/site"

/** Botón flotante solo en móvil, donde el CTA del header se oculta. */
export function WhatsAppFab() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Cotiza por WhatsApp"
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-xl shadow-black/50 ring-4 ring-background/70 transition-transform duration-150 outline-none focus-visible:ring-ring active:scale-95 sm:hidden"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  )
}
