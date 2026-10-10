/*
 * Geometría y coreografía de la llegada del RZR en el hero.
 *
 * Coordenadas en px de la foto original (1672×941): la capa del auto se recortó
 * de `hero.png`, así que en su posición final encaja exactamente sobre el fondo.
 * Si cambias la foto del hero, regenera `hero-fondo.png`/`hero-razer.png` con
 * `scripts/hero-scene/build_layers.py`: imprime CANVAS, CAR_BOX y las llantas.
 */

export const CANVAS = { w: 1672, h: 941 }

/** Caja del auto recortado dentro de la foto. */
export const CAR_BOX = { x: 928, y: 430, w: 744, h: 447 }

/** Punto donde cada llanta toca el piso. */
const WHEELS = {
  frontFar: { x: 1010, y: 797 },
  frontNear: { x: 1296, y: 873 },
  rear: { x: 1620, y: 792 },
}

/*
 * Movimiento del auto. TRAVEL_END, START_OFFSET, OVERSHOOT y EASE deben coincidir
 * con el primer tramo de @keyframes drive-in en hero-scene.module.css.
 * Entra desde fuera de cuadro a la derecha y frena con un ligero rebote.
 */
export const DRIVE_MS = 1500
const TRAVEL_END = 0.64 // fracción del tiempo en que termina el desplazamiento principal
const START_OFFSET = 1.05 * CAR_BOX.w // px: 105% del ancho del auto
const OVERSHOOT = -0.022 * CAR_BOX.w // px: se pasa un poco al frenar
const EASE = [0.25, 0.6, 0.3, 1] as const // cubic-bezier del tramo principal

/** La foto original aparece encima cuando el auto ya se asentó. */
export const REVEAL_DELAY_MS = 1650
export const SCENE_DONE_MS = 4400

// --- Utilidades ------------------------------------------------------------

/** cubic-bezier: dado el avance (eje Y) devuelve la fracción de tiempo (eje X). */
function timeForProgress(progress: number, [x1, y1, x2, y2]: readonly number[]) {
  const sample = (t: number, a: number, b: number) =>
    3 * a * t * (1 - t) ** 2 + 3 * b * t ** 2 * (1 - t) + t ** 3
  let lo = 0
  let hi = 1
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2
    if (sample(mid, y1, y2) < progress) lo = mid
    else hi = mid
  }
  return sample((lo + hi) / 2, x1, x2)
}

/** Momento (ms) en que el auto está desplazado `offset` px de su posición final. */
function timeAtOffset(offset: number) {
  const progress = (START_OFFSET - offset) / (START_OFFSET - OVERSHOOT)
  return Math.round(timeForProgress(Math.min(Math.max(progress, 0), 1), EASE) * DRIVE_MS * TRAVEL_END)
}

/** PRNG determinista: mismas partículas en servidor y cliente (sin errores de hidratación). */
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// --- Partículas de humo ------------------------------------------------------

export type Puff = {
  /** Centro en % de la foto. */
  x: number
  y: number
  /** Ancho en % del ancho de la foto. */
  w: number
  aspect: number
  texture: number
  delay: number
  duration: number
  opacity: number
  scaleFrom: number
  scaleTo: number
  /** Deriva en cqw (1cqw = 1% del ancho de la foto). */
  dx: number
  dy: number
  rotate: number
  spin: number
}

const random = seeded(7)
const between = (min: number, max: number) => min + random() * (max - min)
const pctX = (px: number) => (px / CANVAS.w) * 100
const pctY = (px: number) => (px / CANVAS.h) * 100

function puff(x: number, y: number, overrides: Partial<Puff>): Puff {
  return {
    x: pctX(x),
    y: pctY(y),
    w: between(10, 12),
    aspect: 1.4,
    texture: Math.floor(random() * 3),
    delay: 0,
    duration: between(1600, 2100),
    opacity: between(0.45, 0.6),
    scaleFrom: 0.45,
    scaleTo: between(2.2, 2.9),
    dx: between(3, 7),
    dy: between(-4, -2),
    rotate: between(0, 360),
    spin: between(-50, 50),
    ...overrides,
  }
}

/** Estela: cada bocanada nace justo cuando la llanta pasa por ese punto del piso. */
function trail(wheel: { x: number; y: number }, offsets: number[]) {
  return offsets
    .filter((offset) => wheel.x + offset < CANVAS.w + 40)
    .map((offset) => puff(wheel.x + offset, wheel.y - 6, { delay: timeAtOffset(offset) }))
}

/** Frenón: humo más denso que sale hacia adelante (izquierda) por la inercia. */
function brake(wheel: { x: number; y: number }, count: number, start: number) {
  return Array.from({ length: count }, (_, i) =>
    puff(wheel.x + between(-30, 30), wheel.y - between(0, 14), {
      delay: start + i * 60 + between(0, 40),
      duration: between(2000, 2600),
      opacity: between(0.4, 0.55),
      w: between(10, 13),
      aspect: between(1.3, 1.7),
      scaleFrom: 0.5,
      scaleTo: between(2.3, 3),
      dx: between(-8, -3),
      dy: between(-6, -2),
    })
  )
}

/** Neblina baja que se queda flotando sobre el piso mojado. */
function haze(x: number, delay: number) {
  return puff(x, 862, {
    delay,
    duration: between(2400, 3000),
    opacity: between(0.22, 0.3),
    w: between(24, 30),
    aspect: 2.6,
    scaleFrom: 0.6,
    scaleTo: between(1.6, 2),
    dx: between(-4, -1),
    dy: between(-2, -1),
    rotate: between(-6, 6),
    spin: between(-6, 6),
  })
}

const brakeAt = Math.round(DRIVE_MS * TRAVEL_END * 0.7)

export const PUFFS: Puff[] = [
  ...trail(WHEELS.frontFar, [640, 560, 480, 410, 345, 285, 230, 180, 135, 95, 60, 30]),
  ...trail(WHEELS.frontNear, [370, 315, 265, 220, 175, 135, 100, 65, 35]),
  ...trail(WHEELS.rear, [50, 25, 5]),
  ...brake(WHEELS.frontFar, 4, brakeAt),
  ...brake(WHEELS.frontNear, 4, brakeAt + 40),
  ...brake(WHEELS.rear, 2, brakeAt + 90),
  haze(1150, brakeAt + 120),
  haze(1380, brakeAt + 200),
  haze(1560, brakeAt + 260),
]
