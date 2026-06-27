import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { TESTIMONIALS } from "@/data/content";

export function Testimonials() {
  return (
    <section className="bg-primary-50/30 py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Client Feedback"
          title="What procurement and engineering teams say"
          className="mb-16"
        />
        <div className="grid sm:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.id} delay={(i % 2) * 0.1}>
              <div className="rounded-xl bg-white border border-line p-7 sm:p-8 h-full flex flex-col">
                <Quote className="h-7 w-7 text-accent/40 mb-4" />
                <p className="text-navy text-[15px] sm:text-base leading-relaxed flex-1">
                  "{t.quote}"
                </p>
                <div className="mt-6 pt-5 border-t border-line">
                  <p className="font-display font-semibold text-navy text-sm">{t.name}</p>
                  <p className="text-xs text-steel mt-0.5">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
