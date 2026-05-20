import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const image =
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=80";

export function AboutPreview() {
  return (
    <AnimatedSection className="bg-white px-5 py-20 md:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative aspect-[5/6] overflow-hidden bg-cool-mist">
          <Image
            src={image}
            alt="Refined interior with natural materials and large windows"
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-navy">
            About Kedia Group
          </p>
          <h2 className="mt-5 font-display text-4xl leading-[1.05] text-charcoal-text md:text-5xl">
            Advisory built on structure, trust, and property-specific judgment.
          </h2>
          <p className="mt-6 text-base leading-8 text-slate-gray md:text-lg">
            We combine local intelligence with editorial presentation and
            disciplined negotiation. The result is a process that feels calm to
            clients and compelling to the market.
          </p>
          <p className="mt-5 text-base leading-8 text-slate-gray">
            From quiet pre-market conversations to public launches, every step
            is designed around the property&apos;s real strengths and the
            client&apos;s priorities.
          </p>
          <Button href="/about" variant="secondary" className="mt-8">
            Learn more
          </Button>
        </div>
      </div>
    </AnimatedSection>
  );
}
