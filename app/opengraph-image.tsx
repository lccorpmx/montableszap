import { ImageResponse } from "next/og";

import { getOgFonts } from "@/lib/og-fonts";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          color: "#ffffff",
          fontFamily: "Barlow",
          fontWeight: 900,
          backgroundColor: "#0a0a0c",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(225, 29, 42, 0.45), rgba(10, 10, 12, 0) 55%)",
        }}
      >
        <div style={{ fontSize: 150, letterSpacing: -4, lineHeight: 0.85 }}>MONTABLES</div>
        <div
          style={{
            fontSize: 210,
            fontStyle: "italic",
            color: "#E11D2A",
            letterSpacing: -4,
            lineHeight: 0.85,
          }}
        >
          ZAP
        </div>
        <div
          style={{
            marginTop: 40,
            fontFamily: "Barlow Condensed",
            fontWeight: 600,
            fontSize: 48,
            color: "#e4e4e7",
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          {siteConfig.tagline}
        </div>
      </div>
    ),
    { ...size, fonts: [...(await getOgFonts())] }
  );
}
