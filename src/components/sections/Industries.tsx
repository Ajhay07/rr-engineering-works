import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { INDUSTRIES } from "@/data/content";

export function Industries() {
  return (
    <section id="industries" className="bg-white py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Applications Served"
          title="Applications supported by the official company profile"
          description="The supplied profile references oil and energy, petrochemical, power generation, cryogenic, nuclear areas and valve component applications."
          className="mb-16"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {INDUSTRIES.map((industry, i) => {
            const Icon = industry.icon;
            return (
              <Reveal key={industry.id} delay={(i % 4) * 0.07}>
                <div className="group relative rounded-xl border border-line p-6 h-full bg-white hover:border-primary/40 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display font-semibold text-navy mb-1.5">
                    {industry.name}
                  </h3>
                  <p className="text-sm text-steel leading-relaxed">
                    {industry.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
