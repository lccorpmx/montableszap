import type { CSSProperties } from "react"

/** Fija `--delay` (ms) para `animate-*`, `delay-(--delay)` y `[data-reveal]`. */
export function delay(ms: number): CSSProperties {
  return { "--delay": `${ms}ms` } as CSSProperties
}

type RevealVariant = "up" | "fade" | "scale" | "group"

/** Props para revelar un elemento al entrar al viewport (ver `RevealObserver`). */
export function reveal(variant: RevealVariant = "up", delayMs = 0) {
  return {
    "data-reveal": variant,
    style: delayMs ? delay(delayMs) : undefined,
  }
}
