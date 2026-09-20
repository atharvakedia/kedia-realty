import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default async function Icon() {
  const logoData = await readFile(
    join(process.cwd(), "public/kedia-logo-white-transparent.png"),
    "base64",
  );
  const logoSrc = `data:image/png;base64,${logoData}`;

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
        <img
          src={logoSrc}
          alt=""
          width={410}
          height={243}
          style={{ objectFit: "contain" }}
        />
      </div>
    ),
    size,
  );
}
