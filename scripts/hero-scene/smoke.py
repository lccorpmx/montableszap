"""
Texturas de humo/polvo para la animación del hero (humo-1..3.webp): ruido fractal
con borde irregular y alfa suave.

Uso:
  pip install opencv-python-headless pillow numpy
  python scripts/hero-scene/smoke.py public/images/hero
"""

import sys

import cv2
import numpy as np
from PIL import Image

OUT = sys.argv[1]
SIZE = 256


def fbm(rng, size, octaves=6, persistence=0.55):
    total = np.zeros((size, size), np.float32)
    amp, norm = 1.0, 0.0
    for o in range(octaves):
        cells = 2 ** (o + 2)
        grid = rng.random((cells, cells)).astype(np.float32)
        total += amp * cv2.resize(grid, (size, size), interpolation=cv2.INTER_CUBIC)
        norm += amp
        amp *= persistence
    total /= norm
    return (total - total.min()) / (total.max() - total.min())


def puff(seed, tint):
    rng = np.random.default_rng(seed)
    y, x = np.mgrid[0:SIZE, 0:SIZE].astype(np.float32)
    c = (SIZE - 1) / 2
    r = np.hypot(x - c, y - c) / c

    # Densidad: suma de lóbulos (forma irregular) + ruido fractal en el borde.
    lobes = np.zeros_like(r)
    for _ in range(9):
        ox, oy = rng.uniform(-0.38, 0.38, 2) * c
        rad = rng.uniform(0.45, 0.7) * c
        lobes += np.clip(1 - np.hypot(x - c - ox, y - c - oy) / rad, 0, 1) ** 1.3
    lobes /= lobes.max()

    detail = fbm(rng, SIZE)
    shape = np.clip(lobes * 1.35 - 0.08 + (detail - 0.5) * 0.65, 0, 1)
    alpha = shape ** 1.4 * (0.55 + 0.55 * fbm(rng, SIZE, 5, 0.6))
    alpha *= np.clip(1 - r ** 2.5, 0, 1)  # cero garantizado en el borde del lienzo
    alpha = cv2.GaussianBlur(np.clip(alpha, 0, 1), (0, 0), 1.6)

    shade = 0.82 + 0.18 * fbm(rng, SIZE, 4)  # volumen: zonas más claras/oscuras
    rgb = np.stack([np.clip(shade * t, 0, 255) for t in tint], -1)
    return Image.fromarray(np.dstack([rgb, alpha * 255]).astype(np.uint8), "RGBA")


# El tercero toma un poco del neón rojo de la escena.
for i, tint in enumerate([(232, 232, 236), (222, 222, 228), (236, 226, 224)], 1):
    puff(seed=10 + i * 7, tint=tint).save(f"{OUT}/humo-{i}.webp", "WEBP", quality=82, method=6)
print("ok")
