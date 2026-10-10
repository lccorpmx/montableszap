"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"
import Image from "next/image"

import {
  CANVAS,
  CAR_BOX,
  DRIVE_MS,
  PUFFS,
  REVEAL_DELAY_MS,
  SCENE_DONE_MS,
} from "@/components/sections/hero-scene-data"
import { images } from "@/lib/images"
import { delay } from "@/lib/motion"
import styles from "./hero-scene.module.css"

type SceneState = "idle" | "play" | "done"

// Pasado este punto el respaldo CSS ya mostró la foto: no tiene caso animar.
const FALLBACK_MS = 3000
const READY_TIMEOUT_MS = 2500

/** Tamaño de la "caja" de la foto para cada breakpoint (emula object-cover + object-right). */
const STAGE_SIZES = "(min-width: 1400px) 100vw, (min-width: 1024px) 1380px, (min-width: 640px) 100vw, 134vw"
const CAR_SIZES = "(min-width: 1400px) 45vw, (min-width: 1024px) 620px, (min-width: 640px) 45vw, 60vw"

/**
 * Caja con la proporción exacta de la foto, anclada a la derecha (emula object-cover +
 * object-right). Así el auto y el humo se posicionan en coordenadas de la foto.
 */
const STAGE_CLASS =
  "absolute top-1/2 right-0 aspect-1672/941 w-[max(100cqw,calc(100cqh*1672/941))] -translate-y-1/2 @container-size motion-safe:animate-hero-zoom"

const sceneVars = {
  "--drive-ms": `${DRIVE_MS}ms`,
  "--reveal-delay": `${REVEAL_DELAY_MS}ms`,
} as CSSProperties

const pct = (value: number, total: number) => `${(value / total) * 100}%`

const carStyle: CSSProperties = {
  left: pct(CAR_BOX.x, CANVAS.w),
  top: pct(CAR_BOX.y, CANVAS.h),
  width: pct(CAR_BOX.w, CANVAS.w),
  height: pct(CAR_BOX.h, CANVAS.h),
}

function waitForImage(img: HTMLImageElement | null) {
  if (!img) return Promise.resolve()
  return img.decode().catch(() => undefined)
}

export function HeroScene() {
  const [scene, setScene] = useState<SceneState>("idle")
  const plateRef = useRef<HTMLImageElement>(null)
  const carRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setScene("done")
      return
    }

    let cancelled = false
    let doneTimer: number | undefined
    const timeout = new Promise((resolve) => setTimeout(resolve, READY_TIMEOUT_MS))

    Promise.race([Promise.all([waitForImage(plateRef.current), waitForImage(carRef.current)]), timeout]).then(
      () => {
        if (cancelled) return
        if (performance.now() > FALLBACK_MS) {
          setScene("done")
          return
        }
        setScene("play")
        doneTimer = window.setTimeout(() => setScene("done"), SCENE_DONE_MS)
      }
    )

    return () => {
      cancelled = true
      window.clearTimeout(doneTimer)
    }
  }, [])

  return (
    <div
      data-scene={scene}
      style={sceneVars}
      className={`${styles.scene} relative aspect-4/3 overflow-hidden @container-size sm:aspect-video lg:absolute lg:inset-0 lg:-z-10 lg:aspect-auto`}
    >
      <div className={STAGE_CLASS}>
        <Image
          ref={plateRef}
          src={images.heroScene.fondo}
          alt=""
          fill
          preload
          placeholder="blur"
          sizes={STAGE_SIZES}
        />

        {scene !== "done" ? (
          <div className={styles.car} style={carStyle} aria-hidden="true">
            <span className={styles.carShadow} />
            <Image ref={carRef} src={images.heroScene.razer} alt="" fill loading="eager" sizes={CAR_SIZES} />
          </div>
        ) : null}

        <Image
          src={images.hero}
          alt="Montable tipo Razer naranja frente a la tienda Montables ZAP"
          fill
          loading="eager"
          sizes={STAGE_SIZES}
          className={styles.original}
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-background via-background/30 to-transparent lg:bg-linear-to-r lg:from-background lg:from-25% lg:via-background/75 lg:via-50% lg:to-background/10"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 hidden h-40 bg-linear-to-t from-background to-transparent lg:block"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-background from-20% to-transparent"
      />
      {/* Humo encima de los degradados para que se lea sobre el piso oscuro. */}
      {scene !== "done" ? (
        <div aria-hidden="true" className={`${STAGE_CLASS} pointer-events-none`}>
          {PUFFS.map((p, i) => (
            <span
              key={i}
              className={styles.puff}
              style={
                {
                  ...delay(p.delay),
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: `${p.w}%`,
                  "--aspect": p.aspect,
                  "--texture": `url(${images.heroScene.humo[p.texture].src})`,
                  "--duration": `${Math.round(p.duration)}ms`,
                  "--opacity": p.opacity.toFixed(2),
                  "--scale-from": p.scaleFrom,
                  "--scale-to": p.scaleTo.toFixed(2),
                  "--dx": `${p.dx.toFixed(2)}cqw`,
                  "--dy": `${p.dy.toFixed(2)}cqw`,
                  "--rotate": `${Math.round(p.rotate)}deg`,
                  "--spin": `${Math.round(p.spin)}deg`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      ) : null}

      {/*
        El sticker cubre el letrero de la mascota que ya trae la foto (≈14–31% desde
        la derecha con object-right). Va en % de este contenedor para seguir el recorte.
      */}
      <Image
        src={images.brand.logoMascota}
        alt=""
        loading="eager"
        sizes="(min-width: 1280px) 23vw, (min-width: 1024px) 28vw, (min-width: 640px) 24vw, 30vw"
        style={delay(550)}
        className="absolute top-[3%] right-[15%] w-[30%] rotate-6 drop-shadow-2xl motion-safe:animate-pop sm:right-[11%] sm:w-[24%] lg:top-3 lg:right-[14%] lg:w-[28%] xl:right-[12%] xl:w-[23%]"
      />
    </div>
  )
}
