import { SectionHeading } from "@/components/section-heading"
import { reasons } from "@/lib/content"
import { reveal } from "@/lib/motion"

export function WhyUs() {
  return (
    <section aria-labelledby="por-que-title" className="border-t border-white/5 bg-card/40 py-16 sm:py-20">
      <div className="container">
        <SectionHeading
          id="por-que-title"
          title="¿Por qué elegirnos?"
          description="Somos tu mejor opción en montables eléctricos"
        />
        <ul className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {reasons.map(({ icon: Icon, title, description }, index) => (
            <li
              key={title}
              {...reveal("up", index * 90)}
              className="lg:border-white/10 lg:px-8 lg:first:pl-0 lg:last:pr-0 lg:not-first:border-l"
            >
              <div className="flex items-center gap-3">
                <Icon className="size-10 shrink-0 stroke-[1.5]" aria-hidden="true" />
                <h3 className="max-w-36 font-heading text-lg leading-tight font-bold tracking-wide uppercase">
                  {title}
                </h3>
              </div>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
