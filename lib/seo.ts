import type { Metadata } from "next";

const fallbackSiteUrl = "https://kediagrp.com";

export const siteName = "Kedia Group";
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl
).replace(/\/$/, "");

export const defaultSeoDescription =
  "Rooted in Rajasthan, we create thoughtful communities and enduring landmarks for generations to come.";

export const defaultOgImage = `${siteUrl}/opengraph-image`;

export const defaultOgImageAlt = `${siteName} — Proudly Building Rajasthan`;

// Explicit dimensions/type let Facebook, WhatsApp and LinkedIn render the card on
// the very first share instead of fetching the image asynchronously (which shows
// up in the Sharing Debugger as an "inferred" og:image warning).
export const defaultOgImageMeta = {
  url: defaultOgImage,
  width: 1200,
  height: 630,
  type: "image/png",
  alt: defaultOgImageAlt,
};

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function truncateDescription(value: string, maxLength = 155) {
  const text = value.replace(/\s+/g, " ").trim();

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength - 1).trimEnd()}…`;
}

export function publicPageMetadata({
  title,
  description,
  path,
  image = defaultOgImage,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const canonical = absoluteUrl(path);
  const resolvedImage = absoluteUrl(image);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url: canonical,
      siteName,
      images: [
        resolvedImage === defaultOgImage
          ? defaultOgImageMeta
          : { url: resolvedImage, alt: defaultOgImageAlt },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteName}`,
      description,
      images: [resolvedImage],
    },
  };
}
