import type { ReactNode } from "react"

import { reveal } from "@/lib/motion"
import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  id: string
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
  className?: string
}

export function SectionHeading({ id, title, description, action, className }: SectionHeadingProps) {
  return (
    <div
      {...reveal()}
      className={cn(
        "flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div className="max-w-3xl">
        <h2
          id={id}
          className="font-display text-3xl leading-[0.95] tracking-tight text-balance uppercase sm:text-4xl lg:text-5xl"
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-2 font-heading text-base font-medium tracking-wide text-muted-foreground uppercase sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  )
}
