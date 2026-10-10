import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-display leading-none tracking-tight whitespace-nowrap uppercase",
        className
      )}
    >
      Montables <span className="text-primary italic">Zap</span>
    </span>
  )
}
