import type { Metadata } from "next";

import { ContactPreview } from "@/components/sections/ContactPreview";
import { FeaturedProperties } from "@/components/sections/FeaturedProperties";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { JsonLd } from "@/components/seo/JsonLd";
import { publicPageMetadata } from "@/lib/seo";
import { localBusinessJsonLd } from "@/lib/structured-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = publicPageMetadata({
  title: "Proudly Building Rajasthan",
  description:
    "Rooted in Rajasthan, we create thoughtful communities and enduring landmarks for generations to come.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <Hero />
      <FeaturedProperties />
      <Testimonials />
      <Stats />
      <ContactPreview />
    </>
  );
}
