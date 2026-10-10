export const siteConfig = {
  name: "Montables ZAP",
  tagline: "Montables eléctricos para toda la familia",
  description:
    "Montables eléctricos tipo Razer para niños. Calidad garantizada, modelos exclusivos y envíos a toda la República Mexicana.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  phone: {
    display: "+52 33 3407 0660",
    e164: "+523334070660",
  },
  whatsapp: "523334070660",
  social: {
    tiktok: {
      label: "TikTok",
      handle: "@montables.zap",
      href: "https://www.tiktok.com/@montables.zap",
    },
    instagram: {
      label: "Instagram",
      handle: "@montables.zap",
      href: "https://www.instagram.com/montables.zap",
    },
  },
  // En el mismo orden que las secciones de la página (lo usa el scrollspy).
  nav: [
    { label: "Inicio", href: "#inicio" },
    { label: "Montables", href: "#montables" },
    { label: "Galería", href: "#galeria" },
    { label: "Cómo comprar", href: "#como-comprar" },
    { label: "Envíos", href: "#envios" },
    { label: "Contacto", href: "#contacto" },
  ],
} as const

export type NavItem = (typeof siteConfig.nav)[number]

const DEFAULT_WHATSAPP_MESSAGE = "¡Hola Montables ZAP! Me gustaría cotizar un montable."

export function whatsappUrl(message: string = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`
}
