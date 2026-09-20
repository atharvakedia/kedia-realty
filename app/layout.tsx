import type { Metadata } from "next";

import {
  defaultOgImage,
  defaultSeoDescription,
  siteName,
  siteUrl,
} from "@/lib/seo";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full scroll-smooth"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-soft-white text-charcoal-text antialiased">
        {children}
      </body>
    </html>
  );
}
