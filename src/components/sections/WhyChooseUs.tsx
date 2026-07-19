import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { WHY_CHOOSE_FEATURES } from "@/data/content";

export function WhyChooseUs() {
  return (
    <section className="bg-primary-50/30 py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Why Raghav Engineering"
          title="The capability profile behind the enquiry"
          className="mb-16"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Reveal key={feature.title} delay={(i % 4) * 0.08}>
                <div className="group rounded-xl bg-white border border-line p-7 h-full hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-white mb-5 group-hover:bg-accent transition-colors duration-300">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display font-semibold text-navy text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-steel leading-relaxed">
                    {feature.description}
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
