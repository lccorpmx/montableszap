import { trustPoints } from "@/lib/content"
import { reveal } from "@/lib/motion"

export function TrustBar() {
  return (
    <section aria-label="Nuestros compromisos" className="border-y border-white/5 bg-card/60">
      <ul className="container grid grid-cols-2 lg:grid-cols-4">
        {trustPoints.map(({ icon: Icon, title }, index) => (
          <li
            key={title}
            {...reveal("up", index * 80)}
            className="flex items-center gap-3 py-6 sm:gap-4 sm:py-8 lg:justify-center lg:border-white/10 lg:not-first:border-l"
          >
            <Icon className="size-8 shrink-0 stroke-[1.5] sm:size-10" aria-hidden="true" />
            <span className="max-w-32 font-heading text-sm leading-tight font-semibold tracking-wide uppercase sm:text-base">
              {title}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
