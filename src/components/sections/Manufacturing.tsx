import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { MANUFACTURING_STAGES, PRODUCTION_STATS, QAWT_NOTE, POSITIONER_CAPABILITY } from "@/data/content";
import { CheckCircle2, Shield, Settings, Factory, TrendingUp, Users, Wrench } from "lucide-react";

// Checklists for manufacturing stages to build high trust
const STAGE_CHECKLISTS: Record<string, string[]> = {
  "welding-automation": [
    "GTAW, SMAW, GMAW, FCAW, PTAW and SAW capability referenced in the profile",
    "AUTO-MIG, Hot Wire TIG and robotic TIG/MIG capability referenced",
    "Work carried out according to customer specification and requirement",
    "Technically skilled welding and quality engineers referenced in the profile",
  ],
  overlay: [
    "Nickel based overlay cladding",
    "Cobalt based hard facing",
    "SAW, PTAW, AUTO-TIG and AUTO-MIG overlay portfolio references",
    "Valve component and spool joint portfolio examples from the PDF",
  ],
  machining: [
    "CNC turning lathe",
    "Vertical milling center",
    "Horizontal boring machine and vertical turret lathe",
    "Centre lathe, planning machine and radial drilling machine",
  ],
  "heat-treatment": [
    "Heat treatment process is listed under factory facilities",
    "Used where required by cladding or welding procedure",
    "Process route depends on customer specification",
    "Final requirements must be confirmed per project",
  ],
  inspection: [
    "ISO 9001:2015 certified organization stated in the profile",
    "CMM inspection referenced in the profile",
    "Welding to radiographic quality referenced",
    "Production, testing, certification and documentation support",
  ],
  fabrication: [
    "Fabrication of gate and other valve types shown in the process portfolio",
    "Body + spool joint welding",
    "Bypass welding of valve assembly to RT quality",
    "Assembly welding with dissimilar grades",
  ],
};

const STAT_ICONS = [Factory, Settings, TrendingUp, Users];

export function Manufacturing() {
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const activeStage = MANUFACTURING_STAGES[activeStageIdx];
  const checklist = STAGE_CHECKLISTS[activeStage.id] || [];

  return (
    <section id="manufacturing" className="bg-navy-950 text-white py-24 sm:py-32 relative overflow-hidden">
      {/* Blueprint grid backdrop */}
      <div className="absolute inset-0 bg-blueprint-dark opacity-[0.06] pointer-events-none" />
      <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      <div className="container relative z-10">
        <SectionHeading
          eyebrow="Inside Alapakkam, Chennai Facility"
          title="Welding, cladding and machining capability under one roof"
          description="The official profile lists advanced welding automation, overlay processes, CNC machining, heat treatment and quality inspection at the Alapakkam, Chennai facility."
          light
          className="mb-16"
        />

        {/* Bento Grid Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {PRODUCTION_STATS.map((stat, i) => {
            const Icon = STAT_ICONS[i % STAT_ICONS.length];
            return (
              <Reveal key={stat.label} delay={i * 0.08}>
                <div className="group rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] p-6 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Icon className="h-20 w-20 text-accent" />
                  </div>
                  <div className="font-display text-3xl sm:text-4xl font-bold text-accent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/50 font-mono-data uppercase tracking-wider leading-snug">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Interactive Process Stepper Section */}
        <div className="grid lg:grid-cols-[0.35fr_1fr] gap-10 items-stretch">
          {/* Stepper Steps (Left side navigation) */}
          <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2.5 border-b lg:border-b-0 lg:border-l border-white/10 pb-4 lg:pb-0 lg:pl-4 scrollbar-none shrink-0">
            {MANUFACTURING_STAGES.map((stage, idx) => {
              const isActive = idx === activeStageIdx;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStageIdx(idx)}
                  className={`flex items-center gap-3.5 px-5 py-4 rounded-xl text-left transition-all duration-300 ${
                    isActive
                      ? "bg-accent text-white shadow-glow translate-x-1"
                      : "bg-white/[0.02] border border-white/5 text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="font-mono-data text-xs font-bold">
                    Stage {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-sm font-semibold whitespace-nowrap lg:whitespace-normal">{stage.title}</span>
                </button>
              );
            })}
          </div>

          {/* Stepper Content Display (Right side panel) */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 sm:p-10 grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-center min-h-[480px]">
            {/* Left Column: Stage Text details */}
            <div className="flex flex-col justify-between h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-4 text-accent">
                    <Shield className="h-4 w-4" />
                    <span className="font-mono-data text-[10px] uppercase tracking-widest font-bold">
                      Facility Stage {activeStageIdx + 1}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
                    {activeStage.title}
                  </h3>
                  <p className="text-sm sm:text-base text-white/60 leading-relaxed mb-6">
                    {activeStage.description}
                  </p>

                  {/* Dynamic checklist */}
                  <div>
                    <h4 className="font-mono-data text-[10px] text-white/40 uppercase tracking-widest mb-3">
                      PDF-backed capability notes
                    </h4>
                    <ul className="flex flex-col gap-2.5">
                      {checklist.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-white/70 font-mono-data leading-relaxed">
                          <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: Stage Image */}
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-white/10 bg-navy-950">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeStage.id}
                  src={activeStage.image}
                  alt={`${activeStage.title} process`}
                  className="w-full h-full object-cover opacity-80"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  loading="lazy"
                />
              </AnimatePresence>
              <div className="absolute inset-4 border border-white/5 pointer-events-none" />
              <div className="absolute bottom-4 left-4 font-mono-data text-[9px] text-white/55 bg-black/40 backdrop-blur px-2.5 py-1 rounded">
                UNIT_01 // STAGE_{activeStage.id.toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        {/* Additional PDF-Verified Capabilities */}
        <div className="mt-16 grid sm:grid-cols-2 gap-6">
          <Reveal>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
              <div className="flex items-center gap-3 mb-4">
                <Wrench className="h-5 w-5 text-accent" />
                <span className="font-mono-data text-[10px] uppercase tracking-widest text-accent font-bold">
                  Equipment Capability
                </span>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                {POSITIONER_CAPABILITY}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-5 w-5 text-accent" />
                <span className="font-mono-data text-[10px] uppercase tracking-widest text-accent font-bold">
                  QAWT Reference
                </span>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                {QAWT_NOTE}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
