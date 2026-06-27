import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield, Settings, Cpu, FileCheck } from "lucide-react";

const LOGS = [
  "INITIALIZING INDUSTRIAL VALVE PORTAL...",
  "CONNECTING TO MANUFACTURING DATABASE...",
  "LOADING COMPONENT: CAD VECTOR ENGINE...",
  "VERIFYING ISO 9001:2015 COMPLIANCE CERTIFICATION...",
  "CHECKING API 6D DESIGN STANDARDS...",
  "ESTABLISHING SECURE RFQ TRANSMISSION PIPELINE...",
  "CALIBRATING MATERIAL TRACEABILITY DATASETS (EN 10204 3.1)...",
  "FETCHING GEOLOCATION: MARAIMALAI NAGAR FACILITY...",
  "CALCULATING ANNUAL VALVE PRODUCTION CAPACITY...",
  "SYNCHRONIZING VALVE CONFIGURATOR MODULES...",
  "SYSTEM CHECK OK. PORTAL ONLINE.",
];

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    // Increment progress
    const duration = 1600; // 1.6s loading time
    const intervalTime = 20;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 400);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    // Cycle through log messages based on progress
    const step = 100 / LOGS.length;
    const currentLog = Math.min(Math.floor(progress / step), LOGS.length - 1);
    setLogIndex(currentLog);
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-navy-950 text-white select-none overflow-hidden"
    >
      {/* Tech grid backdrop */}
      <div className="absolute inset-0 bg-blueprint-dark opacity-10" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl" />

      <div className="relative w-full max-w-lg px-6 flex flex-col items-center">
        {/* Animated Icon Grid */}
        <div className="relative mb-8 flex justify-center gap-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-accent"
          >
            <Settings className="h-6 w-6" />
          </motion.div>
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-primary-400">
            <Cpu className="h-6 w-6 animate-pulse" />
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-green-400">
            <FileCheck className="h-6 w-6" />
          </div>
        </div>

        {/* Brand Name */}
        <div className="text-center mb-10">
          <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight uppercase">
            RR Engineering <span className="text-accent">Works</span>
          </h2>
          <p className="font-mono-data text-[10px] uppercase tracking-[0.2em] text-white/50 mt-1">
            Precision Valve Manufacturing Portal
          </p>
        </div>

        {/* Progress Bar & Number */}
        <div className="w-full bg-white/5 border border-white/10 rounded-full h-2.5 overflow-hidden mb-5">
          <motion.div
            className="bg-gradient-to-r from-primary via-accent to-accent h-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between w-full font-mono-data text-[11px] text-white/60 mb-8">
          <span>SYSTEM INGESTION</span>
          <span className="text-accent font-bold">{Math.round(progress)}%</span>
        </div>

        {/* Running Log terminal */}
        <div className="w-full bg-black/40 border border-white/5 rounded-lg p-4 font-mono text-[10px] sm:text-[11px] text-white/50 h-24 flex flex-col justify-end overflow-hidden">
          <div className="flex items-center gap-2 text-accent mb-1.5 font-bold uppercase tracking-wider">
            <Shield className="h-3 w-3 animate-pulse" />
            <span>Systems Diagnostics</span>
          </div>
          <div className="transition-all duration-200 min-h-[30px] flex items-center text-white/80 border-t border-white/5 pt-2">
            &gt; {LOGS[logIndex]}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
