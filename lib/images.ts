/*
 * Todas las fotos del sitio, como imports estáticos: Next les agrega un hash a la
 * URL (al reemplazar un archivo nunca se sirve la versión vieja desde caché) y
 * calcula width/height y el desenfoque de carga (`placeholder="blur"`).
 *
 * Para cambiar una foto, reemplaza el archivo en `public/images/` con el mismo
 * nombre; si cambia la extensión, actualiza aquí la ruta.
 */
import hero from "@/public/images/hero/hero.png"
import heroFondo from "@/public/images/hero/hero-fondo.png"
import heroRazer from "@/public/images/hero/hero-razer.png"
import humo1 from "@/public/images/hero/humo-1.webp"
import humo2 from "@/public/images/hero/humo-2.webp"
import humo3 from "@/public/images/hero/humo-3.webp"
import logoMascota from "@/public/images/brand/logo-mascota.png"
import mascota from "@/public/images/brand/mascota.png"
import envioTienda from "@/public/images/envios/tienda.png"
import razers from "@/public/images/productos/razers.png"
import videoPoster from "@/public/images/galeria/video-poster.jpg"
import entregaRazer from "@/public/images/galeria/entrega-razer.jpg"
import razerRosa from "@/public/images/galeria/razer-rosa.jpg"
import envioCaja from "@/public/images/galeria/envio-caja.jpg"
import galeriaTienda from "@/public/images/galeria/tienda.jpg"
import envioCamion from "@/public/images/galeria/envio-camion.jpg"
import entrega1 from "@/public/images/testimonios/entrega-1.jpg"
import entrega2 from "@/public/images/testimonios/entrega-2.jpg"
import entrega3 from "@/public/images/testimonios/entrega-3.jpg"
import entrega4 from "@/public/images/testimonios/entrega-4.jpg"

export const images = {
  hero,
  /** Capas de la animación de llegada: fondo sin el auto, el auto recortado y texturas de humo. */
  heroScene: { fondo: heroFondo, razer: heroRazer, humo: [humo1, humo2, humo3] },
  brand: { logoMascota, mascota },
  envios: { tienda: envioTienda },
  productos: { razers },
  galeria: { videoPoster, entregaRazer, razerRosa, envioCaja, tienda: galeriaTienda, envioCamion },
  testimonios: [entrega1, entrega2, entrega3, entrega4],
}
