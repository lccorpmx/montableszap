"use client"

import { useState, type ReactNode } from "react"
import Image from "next/image"
import { Play } from "lucide-react"

import { TikTokIcon } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import type { MediaItem } from "@/lib/content"
import { reveal } from "@/lib/motion"
import { siteConfig } from "@/lib/site"
import { cn } from "@/lib/utils"

type MediaShowcaseProps = {
  items: MediaItem[]
  header: ReactNode
}

export function MediaShowcase({ items, header }: MediaShowcaseProps) {
  const [activeId, setActiveId] = useState(items[0]?.id)
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)

  const active = items.find((item) => item.id === activeId) ?? items[0]
  if (!active) return null

  function select(id: string) {
    setActiveId(id)
    setPlaying(false)
    setFailed(false)
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-x-12 lg:gap-y-8">
      <div {...reveal("up", 100)} className="lg:col-start-2 lg:row-start-1 lg:self-end">
        {header}
      </div>

      <div
        {...reveal("scale")}
        className="relative aspect-video overflow-hidden rounded-2xl bg-card ring-1 ring-white/10 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-center"
      >
        {active.type === "video" && playing ? (
          failed ? (
            <div className="flex size-full flex-col items-center justify-center gap-4 p-6 text-center">
              <p className="text-base text-muted-foreground">No pudimos cargar el video en este momento.</p>
              <a
                href={siteConfig.social.tiktok.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 px-5")}
              >
                <TikTokIcon className="size-4" />
                Ver videos en TikTok
              </a>
            </div>
          ) : (
            <video
              key={active.id}
              src={active.src}
              poster={active.poster.src}
              controls
              autoPlay
              playsInline
              onError={() => setFailed(true)}
              className="size-full bg-black object-cover"
            >
              Tu navegador no puede reproducir este video.
            </video>
          )
        ) : (
          <>
            <Image
              key={active.id}
              src={active.type === "video" ? active.poster : active.src}
              alt={active.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1280px) 720px, (min-width: 1024px) 58vw, 100vw"
              className="object-cover motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300"
            />
            {active.type === "video" ? (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="group absolute inset-0 grid place-items-center bg-black/20 transition-colors outline-none hover:bg-black/10 focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-inset"
              >
                <span className="grid size-16 place-items-center rounded-full bg-primary text-primary-foreground shadow-2xl shadow-black/50 ring-4 ring-white/20 transition-transform duration-200 group-hover:scale-110 group-active:scale-95 sm:size-20">
                  <Play className="ml-1 size-7 fill-current sm:size-8" aria-hidden="true" />
                </span>
                <span className="sr-only">Reproducir video</span>
              </button>
            ) : null}
          </>
        )}
      </div>

      <div className="lg:col-start-2 lg:row-start-2 lg:self-start">
        <p className="sr-only" aria-live="polite">
          Mostrando: {active.alt}
        </p>
        <ul className="grid grid-cols-3 gap-2 sm:gap-3">
          {items.map((item, index) => {
            const selected = item.id === active.id
            return (
              <li key={item.id} {...reveal("up", 200 + index * 60)}>
                <button
                  type="button"
                  onClick={() => select(item.id)}
                  aria-pressed={selected}
                  aria-label={item.alt}
                  className={cn(
                    "group relative block aspect-4/3 w-full overflow-hidden rounded-lg bg-card ring-1 ring-white/10 transition outline-none focus-visible:ring-3 focus-visible:ring-ring",
                    selected && "ring-2 ring-primary"
                  )}
                >
                  <Image
                    src={item.type === "video" ? item.poster : item.src}
                    alt=""
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 160px, 33vw"
                    className={cn(
                      "object-cover transition duration-300 group-hover:scale-105 motion-reduce:transition-none",
                      selected ? "opacity-100" : "opacity-70 group-hover:opacity-100"
                    )}
                  />
                  {item.type === "video" ? (
                    <span aria-hidden="true" className="absolute inset-0 grid place-items-center">
                      <span className="grid size-8 place-items-center rounded-full bg-black/60 text-white ring-1 ring-white/30 backdrop-blur-sm">
                        <Play className="ml-0.5 size-3.5 fill-current" />
                      </span>
                    </span>
                  ) : null}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
