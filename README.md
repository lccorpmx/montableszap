# Montables ZAP

Landing de Montables ZAP: Next.js 16 (App Router), Tailwind CSS v4 y shadcn/ui (preset `base-nova`, sobre Base UI).

```bash
npm run dev     # http://localhost:3000
npm run build   # build de producción (todo se pre-renderiza como estático)
```

## Dónde editar

| Qué | Archivo |
| --- | --- |
| Teléfono, WhatsApp, redes, navegación | `lib/site.ts` |
| Textos, producto destacado, pasos, galería, testimonios | `lib/content.ts` |
| Fotos (imports estáticos) | `lib/images.ts` |
| Colores y tipografía (tokens de shadcn) | `app/globals.css` |
| Secciones de la página | `components/sections/*` |
| Header, footer y botón flotante | `components/layout/*` |

Todos los CTA abren WhatsApp con un mensaje prellenado (`whatsappUrl()` en `lib/site.ts`).

## Fotos

Todas se cargan como imports estáticos desde `lib/images.ts`: Next les pone un hash en la URL (un archivo reemplazado nunca se sirve viejo desde caché), calcula sus dimensiones y genera el desenfoque de carga. Para cambiar una foto, reemplaza el archivo con **el mismo nombre**; si cambias la extensión, actualiza la ruta en `lib/images.ts`.

| Archivo | Tamaño | Uso | Estado |
| --- | --- | --- | --- |
| `hero/hero.png` | 1672×941 | Fondo del hero | Real |
| `hero/hero-fondo.png`, `hero/hero-razer.png` | Generadas de `hero.png` | Capas de la animación del hero | Generadas |
| `brand/logo-mascota.png` | 1254×1254, transparente | Sticker del hero | Real |
| `brand/mascota.png` | 606×1402, transparente | Mascota de "Cómo comprar" | Real |
| `envios/tienda.png` | 1672×941 | Fachada en "Envíos" | Real |
| `productos/razers.png` | 1448×1086, recorte transparente | Producto destacado | Real |
| `galeria/video-poster.jpg` | 1280×720 | Portada del video | Placeholder |
| `galeria/{entrega-razer,razer-rosa,envio-caja,tienda,envio-camion}.jpg` | 800×600 | Galería | Placeholder |
| `testimonios/entrega-{1,2,3,4}.jpg` | 800×600 | Fotos de entregas | Placeholder |

## Video

El video de la galería se carga desde `public/videos/montables-zap.mp4` (H.264, idealmente < 10 MB). Mientras no exista, el reproductor muestra un enlace a TikTok.

## Producción

Define `NEXT_PUBLIC_SITE_URL` (p. ej. `https://montableszap.com`) para que las URLs canónicas, Open Graph y JSON-LD apunten al dominio real.

## Animaciones

### Llegada del RZR (hero)

Al cargar, el RZR entra manejando desde la derecha, frena con rebote de suspensión y levanta humo por las llantas (`components/sections/hero-scene*`). Se arma con capas generadas a partir de `hero/hero.png`:

- `hero/hero-fondo.png`: la foto sin el auto (reconstruida con IA).
- `hero/hero-razer.png`: el auto recortado.
- `hero/humo-{1,2,3}.webp`: texturas de humo.

Al terminar aparece la foto original encima, así que el resultado final es idéntico a `hero.png`. Con "reducir movimiento" o sin JavaScript se muestra la foto directo. **Si cambias la foto del hero**, regenera las capas con `scripts/hero-scene/build_layers.py` (instrucciones dentro del archivo) y actualiza la geometría en `hero-scene-data.ts`.

### Resto de la página

- **Carga (hero):** solo CSS (`motion-safe:animate-enter` + `style={delay(ms)}`), no esperan a JavaScript.
- **Al hacer scroll:** agrega `{...reveal("up" | "fade" | "scale", delayMs)}` a cualquier elemento. `RevealObserver` (en el layout) le pone `data-revealed` al entrar al viewport.
- **Secuencias:** `reveal("group")` en el contenedor y la variante `pre-reveal:` en los hijos para su estado inicial (ver "Cómo comprar" y el mapa).
- Con "reducir movimiento" activado o sin JavaScript, todo se muestra en su estado final.
- Evita poner `data-reveal` en elementos con utilidades `transition-*` (p. ej. botones): envuélvelos en un `div`.

## Notas

- El contorno de México (`components/sections/mexico-map-data.ts`) se generó desde Natural Earth 1:50m (dominio público).
- El sitio es solo en modo oscuro: los tokens viven en `:root` y `<html>` lleva la clase `dark`.
