import { Truck } from "lucide-react"

import { CITY_POINTS, MEXICO_PATH, MEXICO_VIEWBOX } from "@/components/sections/mexico-map-data"
import { delay, reveal } from "@/lib/motion"
import { cn } from "@/lib/utils"

type Point = readonly [number, number]

const ORIGIN = CITY_POINTS.guadalajara
const DESTINATIONS: Point[] = [
  CITY_POINTS.tijuana,
  CITY_POINTS.laPaz,
  CITY_POINTS.chihuahua,
  CITY_POINTS.monterrey,
  CITY_POINTS.cdmx,
  CITY_POINTS.oaxaca,
  CITY_POINTS.merida,
]

// Cada ruta se "dibuja" en trazo sólido y al terminar cede el lugar a la línea punteada animada.
const FIRST_ROUTE_MS = 350
const ROUTE_INTERVAL_MS = 140
const DRAW_MS = 700
const routeAt = (index: number) => FIRST_ROUTE_MS + index * ROUTE_INTERVAL_MS

/** Curva cuadrática que siempre se arquea hacia arriba. */
function arc([x1, y1]: Point, [x2, y2]: Point, bend = 0.22) {
  const dx = x2 - x1
  const dy = y2 - y1
  const sign = dx >= 0 ? 1 : -1
  const cx = (x1 + x2) / 2 + dy * bend * sign
  const cy = (y1 + y2) / 2 - dx * bend * sign
  return `M${x1} ${y1}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2} ${y2}`
}

const svgPop = "origin-center [transform-box:fill-box]"

export function MexicoMap({ className }: { className?: string }) {
  return (
    <div {...reveal("group")} className={cn("group/map relative", className)}>
      <svg viewBox={MEXICO_VIEWBOX} role="img" aria-labelledby="mapa-envios-title" className="h-auto w-full overflow-visible">
        <title id="mapa-envios-title">
          Mapa de México con rutas de envío desde Guadalajara hacia todo el país
        </title>
        <defs>
          <marker
            id="route-arrow"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M0 0L10 5L0 10z" className="fill-primary" />
          </marker>
        </defs>

        <path
          d={MEXICO_PATH}
          className="fill-white/[0.07] stroke-white/25 transition-opacity duration-700 pre-reveal:opacity-0"
          strokeWidth={1.2}
          strokeLinejoin="round"
        />

        {DESTINATIONS.map((point, index) => {
          const d = arc(ORIGIN, point)
          const start = routeAt(index)
          return (
            <g key={point.join()}>
              <path
                d={d}
                fill="none"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeDasharray="8 6"
                markerEnd="url(#route-arrow)"
                style={delay(start + DRAW_MS - 150)}
                className="stroke-primary transition-opacity duration-300 delay-(--delay) motion-safe:animate-route-flow pre-reveal:opacity-0"
              />
              <path
                d={d}
                fill="none"
                strokeWidth={2.5}
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray="1"
                style={{
                  transition: `stroke-dashoffset ${DRAW_MS}ms cubic-bezier(0.16, 1, 0.3, 1) ${start}ms, opacity 300ms linear ${start + DRAW_MS}ms`,
                }}
                className="stroke-primary opacity-0 pre-reveal:opacity-100 pre-reveal:[stroke-dashoffset:1]"
              />
            </g>
          )
        })}

        {DESTINATIONS.map(([x, y], index) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r={4}
            style={delay(routeAt(index) + DRAW_MS - 120)}
            className={cn(
              "fill-white transition-[scale] duration-500 ease-spring delay-(--delay) pre-reveal:scale-0",
              svgPop
            )}
          />
        ))}

        <circle
          cx={ORIGIN[0]}
          cy={ORIGIN[1]}
          r={12}
          className={cn("fill-primary/40 opacity-0 motion-safe:group-data-revealed/map:animate-halo", svgPop)}
        />
        <circle
          cx={ORIGIN[0]}
          cy={ORIGIN[1]}
          r={8}
          strokeWidth={3}
          style={delay(150)}
          className={cn(
            "fill-primary stroke-white transition-[scale] duration-500 ease-spring delay-(--delay) pre-reveal:scale-0",
            svgPop
          )}
        />
      </svg>

      <span
        aria-hidden="true"
        style={delay(routeAt(DESTINATIONS.length - 1) + DRAW_MS)}
        className="absolute top-[6%] right-[4%] grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/30 ring-4 ring-background transition-[opacity,scale] duration-600 ease-spring delay-(--delay) pre-reveal:scale-50 pre-reveal:opacity-0 sm:size-16"
      >
        <Truck className="size-7 sm:size-8" />
      </span>
    </div>
  )
}
