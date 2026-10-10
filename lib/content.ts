import type { ComponentType } from "react"
import type { StaticImageData } from "next/image"
import {
  BadgeCheck,
  CreditCard,
  Gem,
  Headset,
  MapPin,
  Rocket,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Trophy,
  Truck,
} from "lucide-react"

import { WhatsAppIcon } from "@/components/icons"
import { images } from "@/lib/images"

type Icon = ComponentType<{ className?: string }>

export type Feature = {
  icon: Icon
  title: string
  description?: string
}

export const heroHighlights: Feature[] = [
  { icon: Gem, title: "Calidad garantizada" },
  { icon: Rocket, title: "Modelos exclusivos" },
  { icon: Truck, title: "Envíos a toda la república" },
]

export const trustPoints: Feature[] = [
  { icon: Settings, title: "Variedad de modelos" },
  { icon: ShieldCheck, title: "Seguridad y confianza" },
  { icon: CreditCard, title: "Pagos seguros" },
  { icon: MapPin, title: "Envíos a toda la república" },
]

export const featuredProduct = {
  name: "Razers",
  eyebrow: "Montables tipo Razer",
  description:
    "Diseño todoterreno con jaula antivuelco y llantas de tracción para que tus hijos vivan la aventura. Pregúntanos por modelos, colores y disponibilidad.",
  image: images.productos.razers,
  alt: "Montable eléctrico tipo Razer rosa con jaula antivuelco",
}

export const reasons: Feature[] = [
  {
    icon: Trophy,
    title: "Modelos exclusivos",
    description: "Contamos con gran variedad de montables que no encontrarás en todos lados.",
  },
  {
    icon: BadgeCheck,
    title: "Calidad garantizada",
    description: "Productos confiables, seguros y con el mejor desempeño.",
  },
  {
    icon: Truck,
    title: "Envíos a toda la república",
    description: "Llevamos la diversión hasta la puerta de tu casa.",
  },
  {
    icon: Headset,
    title: "Atención personalizada",
    description: "Te asesoramos por WhatsApp durante todo el proceso.",
  },
]

export const purchaseSteps: Feature[] = [
  { icon: WhatsAppIcon, title: "Cotiza", description: "Envíanos un mensaje por WhatsApp." },
  { icon: ShoppingCart, title: "Elige", description: "Selecciona tu modelo favorito." },
  { icon: CreditCard, title: "Confirma", description: "Realiza tu pago de forma segura." },
  { icon: Truck, title: "Recibe", description: "Enviamos a toda la república." },
]

export type MediaItem =
  | { type: "video"; id: string; src: string; poster: StaticImageData; alt: string }
  | { type: "image"; id: string; src: StaticImageData; alt: string }

export const gallery: MediaItem[] = [
  {
    type: "video",
    id: "recorrido",
    src: "/videos/montables-zap.mp4",
    poster: images.galeria.videoPoster,
    alt: "Video: recorrido por los montables de la tienda",
  },
  {
    type: "image",
    id: "entrega-razer",
    src: images.galeria.entregaRazer,
    alt: "Entrega de un montable Razer en tienda",
  },
  {
    type: "image",
    id: "razer-rosa",
    src: images.galeria.razerRosa,
    alt: "Razer rosa listo para entrega",
  },
  {
    type: "image",
    id: "envio-caja",
    src: images.galeria.envioCaja,
    alt: "Montable protegido en caja de madera para envío",
  },
  {
    type: "image",
    id: "tienda",
    src: images.galeria.tienda,
    alt: "Asesoría personalizada dentro de la tienda",
  },
  {
    type: "image",
    id: "envio-camion",
    src: images.galeria.envioCamion,
    alt: "Caja de envío cargada en camioneta rumbo a su destino",
  },
]

export type Testimonial = {
  quote: string
  image: StaticImageData
  alt: string
}

export const testimonials: Testimonial[] = [
  {
    quote: "Excelente servicio, mi hijo quedó encantado. Llegó súper rápido.",
    image: images.testimonios[0],
    alt: "Entrega de un montable Razer a un cliente",
  },
  {
    quote: "100% recomendados, muy buena atención y productos de calidad.",
    image: images.testimonios[1],
    alt: "Cliente recibiendo su Razer en tienda",
  },
  {
    quote: "Todo llegó en perfecto estado, sin duda volvería a comprar.",
    image: images.testimonios[2],
    alt: "Razer entregado en perfecto estado",
  },
  {
    quote: "La mejor opción en montables, tienen modelos increíbles.",
    image: images.testimonios[3],
    alt: "Razer listo para su nuevo dueño",
  },
]
