import type { Metadata } from "next";
import Image from "next/image";

import { Stats } from "@/components/sections/Stats";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Kedia Group's premium real estate development approach.",
};

const image =
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80";

export default function AboutPage() {
  return (
    <>
      <section className="bg-white px-5 py-16 md:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-navy">
              About Kedia Group
            </p>
            <h1 className="mt-5 font-display text-5xl leading-[0.98] text-charcoal-text md:text-7xl">
              Measured advice for consequential real estate decisions.
            </h1>
          </div>
          <p className="max-w-2xl text-base leading-8 text-slate-gray md:text-lg">
            Kedia Group represents clients across premium residential markets
            with a process shaped by discretion, research, and a deep respect for
            the long-term value of place.
          </p>
        </div>
      </section>

      <AnimatedSection className="bg-white px-5 pb-20 md:px-8 lg:pb-28">
        <div className="mx-auto max-w-7xl">
          <div className="relative aspect-[16/9] overflow-hidden bg-cool-mist">
            <Image
              src={image}
              alt="Elegant living room with warm materials and large windows"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="bg-cool-mist px-5 py-20 md:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            eyebrow="Our standard"
            title="The strongest outcomes come from discipline before exposure."
          />
          <div className="grid gap-8 text-base leading-8 text-slate-gray md:grid-cols-2">
            <p>
              We study the project, buyer demand, timing, and the competitive
              set before recommending a path. That work shapes how each
              development is positioned, presented, negotiated, and protected.
            </p>
            <p>
              Our clients receive direct counsel, polished presentation, and
              calm operational control across every stage of the process.
            </p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="bg-white px-5 py-20 md:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Leadership"
            title="Principled leadership with a long view of value."
            body="Kedia Group is shaped by legacy, operational discipline, and a commitment to real estate that earns trust over time."
          />

          <div className="mt-14 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <article className="relative overflow-hidden bg-deep-navy p-8 text-white md:p-10 lg:p-12">
              <div className="absolute inset-y-0 left-0 w-1 bg-primary-navy" />
              <div className="grid gap-8 md:grid-cols-[13rem_1fr] md:items-start">
                <div>
                  <div className="relative aspect-[4/5] overflow-hidden border border-white/18 bg-white/8">
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.02))]" />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-primary-navy/35 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center font-display text-6xl text-white">
                      PK
                    </div>
                  </div>
                  <p className="mt-3 text-center text-xs uppercase tracking-[0.22em] text-white/45">
                    Portrait
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-silver-shadow">
                    Visionary
                  </p>
                  <h3 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
                    Prakash Chandra Kedia
                  </h3>
                  <div className="mt-8 h-px w-full bg-white/14" />
                  <p className="mt-8 text-base leading-8 text-white/78 md:text-lg">
                    Prakash Chandra Kedia has been the guiding force behind
                    Kedia Group&apos;s values, long-term vision, and commitment
                    to trust-led real estate development. His approach
                    emphasizes integrity, disciplined growth, and creating
                    spaces that hold lasting value for families, businesses,
                    and communities.
                  </p>
                </div>
              </div>
            </article>

            <article className="border border-border-gray bg-soft-white p-8 md:p-10 lg:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-navy">
                Managing Directors
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  ["Mukesh Kedia", "MK"],
                  ["Manan Kedia", "MK"],
                ].map(([name, initials]) => (
                  <div
                    key={name}
                    className="border border-border-gray bg-white p-5"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-cool-mist">
                      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(6,59,104,0.14),rgba(255,255,255,0.3))]" />
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-deep-navy/16 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center font-display text-5xl text-primary-navy">
                        {initials}
                      </div>
                    </div>
                    <h3 className="mt-5 font-display text-2xl leading-tight text-charcoal-text">
                      {name}
                    </h3>
                    <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-gray">
                      Portrait
                    </p>
                  </div>
                ))}
              </div>
              <div className="my-8 h-px bg-border-gray" />
              <p className="text-base leading-8 text-slate-gray">
                Mukesh Kedia and Manan Kedia lead Kedia Group with a modern,
                execution-focused approach while staying grounded in the
                principles established by the group&apos;s foundation. Their
                leadership brings together market understanding, operational
                discipline, and a commitment to delivering well-planned real
                estate projects with reliability and care.
              </p>
            </article>
          </div>
        </div>
      </AnimatedSection>

      <Stats />
    </>
  );
}
