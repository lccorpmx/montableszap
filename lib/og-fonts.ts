import { readFile } from "node:fs/promises"
import { join } from "node:path"

// TTF de Barlow (SIL OFL) para ImageResponse, que no admite woff2.
function loadFont(file: string) {
  return readFile(join(process.cwd(), "assets/fonts", file))
}

export async function getOgFonts() {
  const [black, blackItalic, condensed] = await Promise.all([
    loadFont("Barlow-Black.ttf"),
    loadFont("Barlow-BlackItalic.ttf"),
    loadFont("BarlowCondensed-SemiBold.ttf"),
  ])

  return [
    { name: "Barlow", data: black, weight: 900, style: "normal" },
    { name: "Barlow", data: blackItalic, weight: 900, style: "italic" },
    { name: "Barlow Condensed", data: condensed, weight: 600, style: "normal" },
  ] as const
}
