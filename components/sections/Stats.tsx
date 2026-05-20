import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { stats } from "@/lib/data";

export function Stats() {
  return (
    <AnimatedSection className="bg-deep-navy px-5 py-16 text-white md:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
        {stats.map((item) => (
          <div key={item.label} className="border-l border-steel-blue pl-6">
            <p className="font-display text-5xl leading-none md:text-6xl">
              {item.value}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/72">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
