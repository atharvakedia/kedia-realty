import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function ContactPreview() {
  return (
    <AnimatedSection className="bg-cool-mist px-5 py-20 md:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-navy">
            Contact
          </p>
          <h2 className="mt-5 font-display text-4xl leading-[1.05] text-charcoal-text md:text-5xl">
            Tell us what you are weighing. We will help clarify the next move.
          </h2>
        </div>
        <div className="md:pt-10">
          <p className="text-base leading-8 text-slate-gray">
            Whether you are preparing a listing, evaluating an off-market
            opportunity, or planning a future move, Kedia Group offers measured
            guidance from the first conversation.
          </p>
          <div className="mt-8 grid gap-3 text-sm text-charcoal-text">
            <p>hello@kediarealty.com</p>
            <p>+91 9950158468</p>
          </div>
          <Button href="/contact" variant="secondary" className="mt-8">
            Contact the team
          </Button>
        </div>
      </div>
    </AnimatedSection>
  );
}
