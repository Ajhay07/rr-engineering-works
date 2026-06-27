import { Target, Eye, Factory } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { MILESTONES } from "@/data/content";

export function About() {
  return (
    <section id="about" className="bg-white py-24 sm:py-32">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <Reveal className="relative crop-marks rounded-xl overflow-hidden order-2 lg:order-1">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80"
              alt="RR Engineering Works manufacturing facility floor"
              className="w-full aspect-[4/3] object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-4 left-4 font-mono-data text-[10px] uppercase tracking-wider text-white bg-navy/70 backdrop-blur px-2.5 py-1 rounded">
              Kanchipuram Manufacturing Facility
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 font-mono-data text-xs font-medium uppercase tracking-[0.18em] mb-4 text-primary">
              <span className="h-px w-6 bg-accent" />
              About RR Engineering Works
            </div>
            <Reveal>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold leading-[1.15] text-navy text-balance">
                Two decades of engineering valves that hold the line under pressure
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-base sm:text-lg text-steel leading-relaxed">
                Since {2003}, RR Engineering Works has built a manufacturing
                practice around one principle: a valve is only as reliable
                as the discipline behind it. From our facility in
                Kanchipuram, Tamil Nadu, we design and manufacture industrial
                valves engineered for the pressures, temperatures and media
                that define critical process industries.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-4 text-base sm:text-lg text-steel leading-relaxed">
                Our in-house casting, CNC machining, and testing capabilities
                let us control every variable that determines valve
                performance - from raw material certification to final
                hydrostatic test - before a single product leaves our floor.
              </p>
            </Reveal>

            <div className="mt-8 grid sm:grid-cols-2 gap-5">
              <Reveal delay={0.2}>
                <div className="rounded-lg border border-line p-5 bg-primary-50/40">
                  <Target className="h-5 w-5 text-primary mb-3" />
                  <h3 className="font-display font-semibold text-navy mb-1.5">Our Mission</h3>
                  <p className="text-sm text-steel leading-relaxed">
                    Engineer dependable valve solutions that keep critical
                    infrastructure running safely, on every continent we serve.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.25}>
                <div className="rounded-lg border border-line p-5 bg-primary-50/40">
                  <Eye className="h-5 w-5 text-primary mb-3" />
                  <h3 className="font-display font-semibold text-navy mb-1.5">Our Vision</h3>
                  <p className="text-sm text-steel leading-relaxed">
                    To be India's most trusted valve manufacturing partner
                    for export-grade industrial and process applications.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        <SectionHeading
          eyebrow="Company Timeline"
          title="Milestones that shaped our manufacturing capability"
          className="mb-14"
        />

        <div className="relative">
          <div
            className="hidden lg:block absolute top-0 left-0 right-0 h-px bg-line"
            style={{ top: "1.65rem" }}
            aria-hidden="true"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-x-6 gap-y-10">
            {MILESTONES.map((milestone, i) => (
              <Reveal key={milestone.year} delay={i * 0.08}>
                <div className="relative pl-0 lg:pl-0">
                  <div className="flex items-center gap-3 lg:flex-col lg:items-start lg:gap-3">
                    <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white shrink-0">
                      <Factory className="h-4 w-4" />
                    </div>
                    <span className="font-mono-data text-sm font-semibold text-accent">
                      {milestone.year}
                    </span>
                  </div>
                  <h4 className="font-display font-semibold text-navy mt-3 mb-1.5">
                    {milestone.title}
                  </h4>
                  <p className="text-sm text-steel leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
