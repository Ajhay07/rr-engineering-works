import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { MANUFACTURING_STAGES, PRODUCTION_STATS } from "@/data/content";
import { CheckCircle2, Shield, Settings, Factory, TrendingUp, Users } from "lucide-react";

// Checklists for manufacturing stages to build high trust
const STAGE_CHECKLISTS: Record<string, string[]> = {
  cnc: [
    "Multi-axis CNC dimensional checking to tolerance of +/-0.02mm",
    "Surface roughness testing (Ra 1.6 - Ra 3.2 parameters)",
    "Thread caliper validation (ASME B1.20.1 NPT & BSPT)",
    "Trim seat seat angle verification",
  ],
  casting: [
    "Spectrometer chemical analysis checks for every heat batch",
    "Physical tensile and hardness testing of test bars",
    "Visual casting inspection conforming to MSS SP-55 standards",
    "Dye penetrant inspection (DP) on critical surface areas",
  ],
  testing: [
    "100% hydrostatic shell testing at 1.5x pressure class rating",
    "100% hydrostatic/pneumatic seat leakage validation per API 598",
    "Low-pressure air seat test checking at 80 psi (6 bar)",
    "Witness testing option for third-party inspectors (TUV, SGS)",
  ],
  assembly: [
    "Controlled torque assembly for bonnet bolting per specifications",
    "Stem packing installation using pre-formed graphitic rings",
    "Manual and actuator alignment calibration checks",
    "Antistatic device electrical resistance check",
  ],
  inspection: [
    "EN 10204 3.1 material test certificate compilation",
    "Visual and dimensional final check matching client GA drawings",
    "Casting thickness verification using ultrasonic thickness gauges",
    "Nameplate details and heat code stamping audits",
  ],
  packing: [
    "Flange face raised-edge protection using robust wood/plastic caps",
    "Vapor Corrosion Inhibitor (VCI) desiccant placement in port holes",
    "Seaworthy heat-treated wooden crate packing (ISPM 15 compliant)",
    "Rigid heavy-duty polythene wrapping for moisture prevention",
  ],
  shipping: [
    "Detailed commercial packing list and custom documentation dispatch",
    "Consolidation support for domestic and international export hubs",
    "Real-time dispatch tracing and freight forwarder coordination",
    "FOB, CIF, and DDP shipping terms documentation support",
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
          eyebrow="Inside Kanchipuram Plant"
          title="Bespoke Production &amp; QA Control Under One Roof"
          description="We control the entire valve manufacturing process. From foundry casting audits to final packaging, precision is verified at every stage."
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
                      QA Audit Stage {activeStageIdx + 1}
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
                      Quality Audit Checklist
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
      </div>
    </section>
  );
}
