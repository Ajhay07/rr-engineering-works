import { ClipboardList, FileCheck2, MessageSquareText, PackageCheck } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const STEPS = [
  {
    icon: ClipboardList,
    title: "Share the requirement",
    text: "Send valve type, size, class, material, media, quantity and delivery location.",
  },
  {
    icon: MessageSquareText,
    title: "Clarify the duty",
    text: "RR Engineering reviews the application before confirming the most suitable construction.",
  },
  {
    icon: FileCheck2,
    title: "Receive quote inputs",
    text: "Get commercial discussion support along with datasheet, testing and packing requirements.",
  },
  {
    icon: PackageCheck,
    title: "Move to dispatch",
    text: "Domestic and export orders can be packed with traceability records and test references.",
  },
];

export function TrustedBy() {
  return (
    <section className="border-b border-line bg-[#f7f5f0] py-14">
      <div className="container">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Procurement friendly</p>
              <h2 className="mt-3 font-display text-2xl font-semibold leading-tight text-navy sm:text-3xl">
                Built around how industrial buyers actually enquire.
              </h2>
              <p className="mt-4 text-sm leading-7 text-steel">
                The site now pushes visitors toward a clear buying conversation instead of only browsing a catalogue.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {STEPS.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="border border-slate-200 bg-white p-5">
                    <Icon className="h-5 w-5 text-accent" />
                    <h3 className="mt-4 font-display text-base font-semibold text-navy">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-steel">{step.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
