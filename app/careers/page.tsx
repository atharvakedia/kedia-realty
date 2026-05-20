import type { Metadata } from "next";

import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { careers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Explore career opportunities with Kedia Group's real estate development team.",
};

export default function CareersPage() {
  return (
    <>
      <section className="bg-white px-5 py-16 md:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeading
            eyebrow="Careers"
            title="Build a thoughtful practice around planned real estate."
            body="We are growing a team that values taste, discretion, preparation, and direct client service."
          />
          <div className="grid gap-4 text-sm leading-7 text-slate-gray md:grid-cols-3">
            <p>High standards without theatrics.</p>
            <p>Strong local knowledge and careful preparation.</p>
            <p>Client trust earned through consistency.</p>
          </div>
        </div>
      </section>

      <section className="bg-cool-mist px-5 py-20 md:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-4xl text-charcoal-text md:text-5xl">
            Open roles
          </h2>
          <div className="mt-10 grid gap-5">
            {careers.map((career) => (
              <article
                key={career.title}
                className="grid gap-5 border border-border-gray bg-white p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8"
              >
                <div>
                  <h3 className="font-display text-2xl text-charcoal-text">
                    {career.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-gray">
                    {career.description}
                  </p>
                </div>
                <div className="text-sm text-slate-gray md:text-right">
                  <p>{career.location}</p>
                  <p className="mt-1">{career.type}</p>
                </div>
              </article>
            ))}
          </div>
          <Button href="mailto:careers@kediarealty.com" className="mt-10">
            Introduce yourself
          </Button>
        </div>
      </section>
    </>
  );
}
