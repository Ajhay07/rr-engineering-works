import { CheckCircle2, ClipboardCheck, FileText, Gauge, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { QUALITY_PROCESS, TESTING_STANDARDS } from "@/data/content";

const QUALITY_POINTS = [
  {
    icon: ClipboardCheck,
    title: "Material review",
    text: "Incoming material and bought-out components are checked against the purchase specification before machining or assembly starts.",
  },
  {
    icon: Gauge,
    title: "Pressure testing",
    text: "Shell and seat tests can be planned against the applicable valve standard and customer inspection requirement.",
  },
  {
    icon: FileText,
    title: "Dispatch documents",
    text: "Orders can be supported with test references, packing details and material traceability records where specified.",
  },
];

export function Quality() {
  return (
    <section id="quality" className="bg-white py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Quality and documentation"
          title="A practical inspection path before the valve leaves the works"
          description="Industrial buyers do not only buy a valve; they need confidence that the supplied item matches the duty, paperwork and dispatch requirement. This section keeps that promise specific and realistic."
          className="mb-14"
        />

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <div className="border border-slate-200 bg-[#f7f5f0] p-7 sm:p-8">
              <div className="flex items-center gap-3 text-accent">
                <ShieldCheck className="h-6 w-6" />
                <span className="text-xs font-semibold uppercase tracking-[0.18em]">Inspection workflow</span>
              </div>
              <div className="mt-7 space-y-5">
                {QUALITY_PROCESS.map((item) => (
                  <div key={item.step} className="grid grid-cols-[42px_1fr] gap-4 border-b border-slate-200 pb-5 last:border-b-0 last:pb-0">
                    <div className="flex h-10 w-10 items-center justify-center bg-navy text-sm font-semibold text-white">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-navy">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-steel">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid gap-6">
            <div className="grid gap-4 sm:grid-cols-3">
              {QUALITY_POINTS.map((point) => {
                const Icon = point.icon;
                return (
                  <Reveal key={point.title}>
                    <div className="h-full border border-slate-200 bg-white p-5 shadow-sm">
                      <Icon className="h-5 w-5 text-accent" />
                      <h3 className="mt-4 font-display text-base font-semibold text-navy">{point.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-steel">{point.text}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.1}>
              <div className="border border-slate-200 bg-navy p-7 text-white sm:p-8">
                <h3 className="font-display text-xl font-semibold">Common test and paperwork references</h3>
                <p className="mt-3 text-sm leading-7 text-white/68">
                  Final testing and documentation depend on valve type, order scope and customer specification. These are the references commonly discussed during RFQ review.
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {TESTING_STANDARDS.map((standard) => (
                    <li key={standard} className="flex items-start gap-3 text-sm text-white/78">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{standard}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
