import type { Metadata } from "next";

import { SiteChrome } from "@/components/layout/SiteChrome";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Kedia Group | Premium Real Estate Advisory",
    template: "%s | Kedia Group",
  },
  description:
    "Premium real estate developer projects across residential, commercial, and industrial formats.",
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
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
