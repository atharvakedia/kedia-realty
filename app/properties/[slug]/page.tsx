import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectAmenitiesCarousel } from "@/components/projects/ProjectAmenitiesCarousel";
import { ProjectImageCarousel } from "@/components/projects/ProjectImageCarousel";
import { ProjectLayouts } from "@/components/projects/ProjectLayouts";
import { getProjectBySlug } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

function formatAcres(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return "—";
  }

  return /[a-z]/i.test(trimmed) ? trimmed : `${trimmed} Acres`;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project" };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const facts = [
    ["Status", project.status],
    ["Type", project.type],
    ["City", project.location],
    ["Region", project.region],
    ["Price", project.priceLabel],
    ["Total Area", formatAcres(project.totalArea)],
    ["Total Units", project.totalUnits],
    ["RERA", project.reraNumber],
    ["Launch", project.launchDate],
  ];

  return (
    <>
      <section className="bg-white px-5 py-16 md:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <div className="flex flex-wrap gap-3">
                <span className="bg-primary-navy px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                  {project.status}
                </span>
                <span className="border border-border-gray px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-navy">
                  {project.type}
                </span>
              </div>
              <h1 className="mt-6 font-display text-5xl leading-[0.98] text-charcoal-text md:text-7xl">
                {project.title}
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-gray">
                {project.location} / {project.region}
              </p>
            </div>
            <div className="grid gap-4 text-charcoal-text sm:grid-cols-2 lg:justify-self-end">
              {facts.slice(3).map(([label, value]) => (
                <div key={label} className="border-t border-border-gray pt-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-gray">
                    {label}
                  </p>
                  <p className="mt-2 font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <ProjectImageCarousel
            title={project.title}
            images={[project.image, ...(project.gallery ?? [])]}
          />
        </div>
      </section>

      <ProjectAmenitiesCarousel
        amenities={project.amenities}
        description={project.description}
      />

      <section className="bg-soft-white px-5 py-20 md:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-navy">
                Location
              </p>
              <h2 className="mt-5 font-display text-4xl leading-[1.05] text-charcoal-text md:text-5xl">
                Connected to {project.region}&apos;s growth corridors.
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-gray">
                {project.location} / {project.region}
              </p>
            </div>
            <div className="overflow-hidden border border-border-gray bg-white shadow-xl shadow-deep-navy/8">
              {project.mapEmbedUrl ? (
                <iframe
                  title={`${project.title} location map`}
                  src={project.mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[26rem] w-full border-0"
                  allowFullScreen
                />
              ) : (
                <div className="flex min-h-[26rem] items-center justify-center bg-white p-8 text-center">
                  <div>
                    <p className="font-display text-3xl text-charcoal-text">
                      Map details coming soon
                    </p>
                    <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-gray">
                      Location information is available for {project.location}.
                      Contact the Kedia Group team for site visit coordination.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <ProjectLayouts layouts={project.layouts} />
    </>
  );
}
