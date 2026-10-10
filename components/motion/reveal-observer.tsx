"use client"

import { useEffect } from "react"

const SELECTOR = "[data-reveal]:not([data-revealed])"

/**
 * Marca con `data-revealed` cada `[data-reveal]` la primera vez que entra al
 * viewport; las animaciones viven en CSS. Los `group` (secuencias coreografiadas)
 * esperan a que se vea ~35% del bloque para que el usuario alcance a verlas.
 */
export function RevealObserver() {
  useEffect(() => {
    const onIntersect: IntersectionObserverCallback = (entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.setAttribute("data-revealed", "")
        observer.unobserve(entry.target)
      }
    }

    const items = new IntersectionObserver(onIntersect, { rootMargin: "0px 0px -8% 0px" })
    const groups = new IntersectionObserver(onIntersect, { threshold: 0.35 })

    const track = (el: Element) =>
      (el.getAttribute("data-reveal") === "group" ? groups : items).observe(el)
    const trackWithin = (root: ParentNode) => root.querySelectorAll(SELECTOR).forEach(track)

    trackWithin(document)

    // Contenido que se monta después (navegación o componentes cliente).
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (!(node instanceof Element)) continue
          if (node.matches(SELECTOR)) track(node)
          trackWithin(node)
        }
      }
    })
    mutations.observe(document.body, { childList: true, subtree: true })

    return () => {
      items.disconnect()
      groups.disconnect()
      mutations.disconnect()
    }
  }, [])

  return null
}
