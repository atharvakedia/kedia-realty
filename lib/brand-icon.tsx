import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

/** Renders the square brand mark used for favicon, PWA and Apple touch icons. */
export async function renderBrandIcon(size: number) {
  const logoData = await readFile(
    join(process.cwd(), "public/kedia-logo-white-transparent.png"),
    "base64",
  );
  const logoSrc = `data:image/png;base64,${logoData}`;
  const logoWidth = Math.round(size * 0.8);
  const logoHeight = Math.round(logoWidth * (243 / 410));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #042B4C 0%, #063B68 68%, #2F6F9F 100%)",
        }}
      >
        {/* ImageResponse (satori) renders raw <img>; next/image cannot be used here. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt=""
          width={logoWidth}
          height={logoHeight}
          style={{ objectFit: "contain" }}
        />
      </div>
    ),
    { width: size, height: size },
  );
}
