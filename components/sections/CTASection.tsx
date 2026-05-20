import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function CTASection() {
  return (
    <AnimatedSection className="bg-soft-white px-5 py-20 md:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl bg-deep-navy px-6 py-14 text-white md:px-12 lg:px-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-silver-shadow">
              Begin with clarity
            </p>
            <h2 className="mt-5 max-w-3xl font-display text-4xl leading-[1.05] md:text-5xl">
              Considering a sale, purchase, or quiet market read?
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/72 md:text-base">
              Start with a confidential conversation about timing, value, and
              the best path forward.
            </p>
          </div>
          <Button href="/contact" className="bg-white text-deep-navy hover:bg-cool-mist">
            Schedule a consultation
          </Button>
        </div>
      </div>
    </AnimatedSection>
  );
}
