import type { Metadata } from "next";

import { ProjectsListingClient } from "@/components/projects/ProjectsListingClient";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPublishedProjects } from "@/lib/projects";
import { publicPageMetadata } from "@/lib/seo";

export const metadata: Metadata = publicPageMetadata({
  title: "Projects",
  description:
    "Explore Kedia Group real estate projects across Jaipur and Rajasthan, including townships, apartments, villas, commercial spaces, farmhouses, plotted developments, and industrial townships.",
  path: "/properties",
});

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <section className="bg-soft-white px-5 py-16 md:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Projects"
          title="Developer projects planned for residential, commercial, and industrial growth."
          body="Browse Kedia Group townships, plotted developments, apartments, commercial assets, villas, farmhouses, and industrial township formats."
          headingLevel="h1"
        />
        <ProjectsListingClient projects={projects} />
      </div>
    </section>
  );
}
