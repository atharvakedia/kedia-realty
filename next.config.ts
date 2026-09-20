import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const isVercelPreview = process.env.VERCEL_ENV === "preview";

function supabaseOrigin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!url) {
    return null;
  }

  try {
    return new URL(url).origin;
  } catch {
    return null;
  }
}

function buildContentSecurityPolicy() {
  const supabase = supabaseOrigin();
  const supabaseHttp = ["https://*.supabase.co", supabase].filter(
    (value): value is string => Boolean(value),
  );
  const supabaseWs = supabaseHttp.map((origin) =>
    origin.replace(/^https:/, "wss:"),
  );

  // Vercel injects its preview toolbar/live comments on preview deployments only.
  const previewOnly = isVercelPreview ? ["https://vercel.live"] : [];
  const previewWs = isVercelPreview ? ["wss://ws-us3.pusher.com"] : [];

  const directives: Array<[string, string[]]> = [
    ["default-src", ["'self'"]],
    [
      "script-src",
      [
        "'self'",
        "'unsafe-inline'",
        ...(isProduction ? [] : ["'unsafe-eval'"]),
        ...previewOnly,
      ],
    ],
    ["style-src", ["'self'", "'unsafe-inline'", ...previewOnly]],
    [
      "img-src",
      [
        "'self'",
        "data:",
        "blob:",
        "https://images.unsplash.com",
        ...supabaseHttp,
        ...previewOnly,
      ],
    ],
    ["font-src", ["'self'", "data:", ...previewOnly]],
    [
      "connect-src",
      ["'self'", ...supabaseHttp, ...supabaseWs, ...previewOnly, ...previewWs],
    ],
    [
      "frame-src",
      ["https://www.google.com", "https://maps.google.com", ...previewOnly],
    ],
    ["worker-src", ["'self'", "blob:"]],
    ["object-src", ["'none'"]],
    ["base-uri", ["'self'"]],
    ["form-action", ["'self'"]],
    ["frame-ancestors", ["'none'"]],
  ];

  if (isProduction) {
    directives.push(["upgrade-insecure-requests", []]);
  }

  return directives
    .map(([name, values]) =>
      values.length ? `${name} ${values.join(" ")}` : name,
    )
    .join("; ");
}

const securityHeaders = [
  { key: "Content-Security-Policy", value: buildContentSecurityPolicy() },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  ...(isProduction
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains",
        },
      ]
    : []),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
