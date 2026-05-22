import type { Metadata } from "next";

import { ApplicationForm } from "@/app/careers/introduce-yourself/ApplicationForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getOpenCareerRoles } from "@/lib/careers";

export const metadata: Metadata = {
  title: "Introduce Yourself",
  description:
    "Submit your resume and introduce yourself for career opportunities at Kedia Group.",
};

export const dynamic = "force-dynamic";

export default async function IntroduceYourselfPage() {
  const roles = await getOpenCareerRoles();

  return (
    <>
      <section className="bg-white px-5 py-16 md:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="Careers"
            title="Introduce yourself to Kedia Group."
            body="Share your resume, the role you are interested in, and the kind of work you want to build with us. We review applications with care and keep strong profiles in consideration for future openings."
          />
        </div>
      </section>

      <section className="bg-cool-mist px-5 pb-20 md:px-8 lg:pb-28">
        <div className="mx-auto max-w-4xl">
          <ApplicationForm roles={roles} />
        </div>
      </section>
    </>
  );
}
