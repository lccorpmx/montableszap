"use client"

import { useActiveSection } from "@/hooks/use-active-section"
import { siteConfig } from "@/lib/site"
import { cn } from "@/lib/utils"

const SECTION_IDS = siteConfig.nav.map((item) => item.href.slice(1))

export function MainNav({ className }: { className?: string }) {
  const active = useActiveSection(SECTION_IDS)

  return (
    <nav aria-label="Principal" className={className}>
      <ul className="flex items-center gap-1">
        {siteConfig.nav.map((item) => {
          const isActive = active === item.href.slice(1)
          return (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "relative inline-flex h-10 items-center rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors duration-200 outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50",
                  "after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform after:duration-200",
                  isActive && "text-foreground after:scale-x-100"
                )}
              >
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
