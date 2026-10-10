"""
Genera las capas de la animación del hero a partir de la foto original:

  hero-razer.png  auto recortado (RGBA), recortado a su caja
  hero-fondo.png  la foto sin el auto (inpainting con LaMa)

e imprime la geometría (caja del auto y contacto de las llantas) que va en
components/sections/hero-scene-data.ts.

Uso (Python 3.10+):
  pip install "rembg[cpu]" opencv-python-headless pillow numpy
  curl -L -o lama_fp32.onnx https://huggingface.co/Carve/LaMa-ONNX/resolve/main/lama_fp32.onnx
  python scripts/hero-scene/build_layers.py public/images/hero/hero.png public/images/hero \
      --region 860,380 --lama lama_fp32.onnx

`--region` es la esquina superior izquierda de un recorte donde el auto sea el
sujeto principal (la segmentación funciona mejor sin el resto de la escena).
"""

import argparse

import cv2
import numpy as np
import onnxruntime as ort
from PIL import Image
from rembg import new_session, remove

parser = argparse.ArgumentParser()
parser.add_argument("src")
parser.add_argument("out_dir")
parser.add_argument("--region", default="860,380")
parser.add_argument("--lama", default="lama_fp32.onnx")
args = parser.parse_args()

hero = np.array(Image.open(args.src).convert("RGB"))
H, W = hero.shape[:2]
rx, ry = (int(v) for v in args.region.split(","))

# --- 1. Segmentación del auto (ISNet) ----------------------------------------
region = Image.fromarray(hero[ry:, rx:])
region_mask = np.array(remove(region, session=new_session("isnet-general-use"), only_mask=True))
mask = np.zeros((H, W), np.uint8)
mask[ry:, rx:] = region_mask

# Conserva el componente principal (y piezas grandes pegadas); quita ruido suelto.
hard = (mask > 40).astype(np.uint8)
n, labels, stats, _ = cv2.connectedComponentsWithStats(hard, 8)
main_area = stats[1:, cv2.CC_STAT_AREA].max()
keep = np.isin(labels, [i for i in range(1, n) if stats[i, cv2.CC_STAT_AREA] > 0.02 * main_area])
keep = cv2.dilate(keep.astype(np.uint8), np.ones((9, 9), np.uint8)).astype(bool)
mask = np.where(keep, mask, 0).astype(np.uint8)

# Alfa más sólido en el interior, sin ruido tenue alrededor.
alpha = np.clip((mask.astype(np.float32) - 20) * 1.25, 0, 255).astype(np.uint8)

# --- 2. Capa del auto ----------------------------------------------------------
ys, xs = np.nonzero(alpha > 8)
x0, x1, y0, y1 = xs.min(), xs.max() + 1, ys.min(), ys.max() + 1
car = np.dstack([hero, alpha])[y0:y1, x0:x1]
Image.fromarray(car, "RGBA").save(f"{args.out_dir}/hero-razer.png", optimize=True)

# --- 3. Fondo sin auto (LaMa) --------------------------------------------------
# Máscara: auto + banda hacia abajo para su sombra y reflejos en el piso mojado.
inpaint = cv2.dilate((mask > 25).astype(np.uint8), np.ones((25, 25), np.uint8))
floor = np.zeros_like(inpaint)
for dy in range(1, 70, 2):
    floor[dy:] |= inpaint[:-dy]
inpaint = cv2.dilate(np.clip(inpaint + floor, 0, 1), np.ones((9, 9), np.uint8))

# LaMa trabaja a 512×512: recorte cuadrado con contexto alrededor del hueco.
side = min(W - max(x0 - 100, 0), H)
cx0, cy0 = W - side, H - side
crop = hero[cy0:, cx0:]
crop_mask = inpaint[cy0:, cx0:]
img_in = cv2.resize(crop, (512, 512), interpolation=cv2.INTER_AREA).astype(np.float32) / 255.0
m_in = (cv2.resize(crop_mask * 255, (512, 512), interpolation=cv2.INTER_NEAREST) > 127).astype(np.float32)

session = ort.InferenceSession(args.lama, providers=["CPUExecutionProvider"])
out = session.run(None, {"image": np.transpose(img_in, (2, 0, 1))[None], "mask": m_in[None, None]})[0][0]
out = np.transpose(out, (1, 2, 0))
out = np.clip(out * 255 if out.max() <= 1.5 else out, 0, 255).astype(np.uint8)
out = cv2.resize(out, (side, side), interpolation=cv2.INTER_CUBIC)

soft = cv2.GaussianBlur(crop_mask.astype(np.float32), (0, 0), 3)[..., None]
plate = hero.copy()
plate[cy0:, cx0:] = (out * soft + crop * (1 - soft)).astype(np.uint8)
Image.fromarray(plate).save(f"{args.out_dir}/hero-fondo.png", optimize=True)

# --- 4. Geometría para hero-scene-data.ts -------------------------------------
solid = alpha > 128
bottoms = [(x, int(np.nonzero(solid[:, x])[0].max())) for x in range(x0, x1) if solid[:, x].any()]
lowest = max(y for _, y in bottoms)
contacts = []
for i, (x, y) in enumerate(bottoms):
    window = [b for _, b in bottoms[max(0, i - 30) : i + 31]]
    # Máximos locales cerca del piso (descarta la carrocería entre llantas).
    if y == max(window) and y > lowest - 100 and (not contacts or x - contacts[-1][0] > 60):
        contacts.append((x, y))

print(f"CANVAS   = {{ w: {W}, h: {H} }}")
print(f"CAR_BOX  = {{ x: {x0}, y: {y0}, w: {x1 - x0}, h: {y1 - y0} }}")
print("Contacto de llantas (x, y):", contacts)
