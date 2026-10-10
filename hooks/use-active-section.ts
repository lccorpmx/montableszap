"use client"

import { useEffect, useState } from "react"

/**
 * Devuelve el id de la sección visible (la última cuyo borde superior cruzó
 * el 40% del viewport). `ids` debe ir en orden de aparición y ser estable.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const threshold = window.innerHeight * 0.4
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4

      let current: string | null = null
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= threshold) current = id
      }
      setActive(atBottom ? ids[ids.length - 1] : current)
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    schedule()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }
  }, [ids])

  return active
}
