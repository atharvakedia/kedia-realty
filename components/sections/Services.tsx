import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/lib/data";

export function Services() {
  return (
    <AnimatedSection className="bg-cool-mist px-5 py-20 md:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Services"
          title="A disciplined way to move through the market."
          body="Kedia Group supports clients before, during, and after the transaction with advice that is direct, current, and highly specific."
        />
        <div className="mt-12 grid border-t border-border-gray md:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="border-b border-border-gray py-8 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0"
            >
              <h3 className="font-display text-2xl text-charcoal-text">
                {service.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-gray">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
