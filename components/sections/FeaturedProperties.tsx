import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { FeaturedProjectsCarousel } from "@/components/sections/FeaturedProjectsCarousel";
import { getFeaturedProjects } from "@/lib/projects";

export async function FeaturedProperties() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <AnimatedSection className="bg-soft-white px-5 py-20 md:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Featured projects"
            title="Planned developments shaped for long-term value."
            body="Explore our newest and most distinguished projects, developed with thoughtful planning, prime locations, and a commitment to lasting real estate value."
          />
          <Button href="/properties" variant="text" className="self-start">
            View all projects
          </Button>
        </div>
        <FeaturedProjectsCarousel projects={featuredProjects} />
      </div>
    </AnimatedSection>
  );
}
