import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const alt = "Kedia Group — Proudly Building Rajasthan";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logoData = await readFile(
    join(process.cwd(), "public/kedia-logo-white-transparent.png"),
    "base64",
  );
  const logoSrc = `data:image/png;base64,${logoData}`;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #042B4C 0%, #063B68 62%, #2F6F9F 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 30,
            display: "flex",
            border: "1px solid rgba(255, 255, 255, 0.18)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 820,
            height: 820,
            top: -470,
            right: -260,
            display: "flex",
            border: "1px solid rgba(255, 255, 255, 0.10)",
            transform: "rotate(34deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 680,
            height: 680,
            bottom: -480,
            left: -180,
            display: "flex",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            transform: "rotate(34deg)",
          }}
        />
        <img
          src={logoSrc}
          alt=""
          width={680}
          height={402}
          style={{
            objectFit: "contain",
            filter: "drop-shadow(0 18px 35px rgba(0, 0, 0, 0.16))",
          }}
        />
      </div>
    ),
    size,
  );
}
