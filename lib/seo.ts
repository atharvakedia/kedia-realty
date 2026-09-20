import type { Metadata } from "next";

const fallbackSiteUrl = "https://kediagrp.com";

export const siteName = "Kedia Group";
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl
).replace(/\/$/, "");

export const defaultSeoDescription =
  "Kedia Group develops real estate projects across Jaipur and Rajasthan, including townships, apartments, villas, commercial spaces, plotted developments, and industrial townships.";

export const defaultOgImage = `${siteUrl}/logokediagroup.png`;

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
        {
          url: resolvedImage,
          alt: `${siteName} real estate projects`,
        },
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
