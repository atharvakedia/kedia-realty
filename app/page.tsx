import { ContactPreview } from "@/components/sections/ContactPreview";
import { FeaturedProperties } from "@/components/sections/FeaturedProperties";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <Testimonials />
      <Stats />
      <ContactPreview />
    </>
  );
}
