"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Star } from "lucide-react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import type { Testimonial } from "@/lib/content"
import { reveal } from "@/lib/motion"
import { cn } from "@/lib/utils"

export function TestimonialsCarousel({
  items,
  className,
}: {
  items: Testimonial[]
  className?: string
}) {
  const [api, setApi] = useState<CarouselApi>()
  const [scrollable, setScrollable] = useState(false)

  // Las flechas solo se muestran si hay más slides de los que caben en pantalla.
  useEffect(() => {
    if (!api) return
    const update = () => setScrollable(api.scrollSnapList().length > 1)
    update()
    api.on("reInit", update)
    return () => {
      api.off("reInit", update)
    }
  }, [api])

  return (
    <Carousel
      setApi={setApi}
      opts={{ align: "start" }}
      aria-label="Opiniones de clientes"
      className={className}
    >
      <CarouselContent className="-ml-4 py-1">
        {items.map((item, index) => (
          <CarouselItem key={item.quote} className="basis-[85%] sm:basis-1/2 lg:basis-1/4">
            <figure
              {...reveal("up", (index % 4) * 90)}
              className="flex h-full flex-col overflow-hidden rounded-xl bg-foreground text-background shadow-xl shadow-black/30"
            >
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-center gap-2">
                  <div className="flex text-rating" role="img" aria-label="5 de 5 estrellas">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} className="size-4 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold tabular-nums" aria-hidden="true">
                    5.0
                  </span>
                </div>
                <blockquote className="text-lg leading-snug font-medium text-pretty">
                  <p>“{item.quote}”</p>
                </blockquote>
              </div>
              <div className="relative aspect-4/3 bg-muted">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 85vw"
                  className="object-cover"
                />
              </div>
            </figure>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className={cn("mt-6 flex justify-center gap-3", !scrollable && "hidden")}>
        <CarouselPrevious className="static inset-auto my-0 size-11" />
        <CarouselNext className="static inset-auto my-0 size-11" />
      </div>
    </Carousel>
  )
}
