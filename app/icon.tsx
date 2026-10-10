import { ImageResponse } from "next/og";

import { getOgFonts } from "@/lib/og-fonts";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 14,
          background: "#E11D2A",
          color: "#ffffff",
          fontFamily: "Barlow",
          fontSize: 50,
          fontWeight: 900,
          fontStyle: "italic",
        }}
      >
        Z
      </div>
    ),
    { ...size, fonts: [...(await getOgFonts())] }
  );
}
