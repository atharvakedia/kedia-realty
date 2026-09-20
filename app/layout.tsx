import type { Metadata } from "next";
import { headers } from "next/headers";

import { SiteChrome } from "@/components/layout/SiteChrome";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  defaultOgImage,
  defaultSeoDescription,
  siteName,
  siteUrl,
} from "@/lib/seo";
import { organizationJsonLd } from "@/lib/structured-data";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Real Estate Developer Projects in Jaipur & Rajasthan`,
    template: `%s | ${siteName}`,
  },
  description: defaultSeoDescription,
  applicationName: siteName,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: `${siteName} | Real Estate Developer Projects in Jaipur & Rajasthan`,
    description: defaultSeoDescription,
    url: siteUrl,
    siteName,
    images: [
      {
        url: defaultOgImage,
        alt: `${siteName} logo`,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Real Estate Developer Projects in Jaipur & Rajasthan`,
    description: defaultSeoDescription,
    images: [defaultOgImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const isAdminHost = requestHeaders.get("x-kedia-admin-host") === "1";

  return (
    <html
      lang="en"
      className="h-full scroll-smooth"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-soft-white text-charcoal-text antialiased">
        <JsonLd data={organizationJsonLd()} />
        <SiteChrome isAdminHost={isAdminHost}>{children}</SiteChrome>
      </body>
    </html>
  );
}
