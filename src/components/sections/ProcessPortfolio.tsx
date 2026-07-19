import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { PROCESS_PORTFOLIO } from "@/data/content";

const CATEGORIES = Array.from(new Set(PROCESS_PORTFOLIO.map((item) => item.category)));

export function ProcessPortfolio() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered =
    activeCategory === "All"
      ? PROCESS_PORTFOLIO
      : PROCESS_PORTFOLIO.filter((item) => item.category === activeCategory);

  const activeItem = filtered[activeIndex] || filtered[0];

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setActiveIndex(0);
  };

  return (
    <section id="portfolio" className="bg-white py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Process Portfolio"
          title="Verified project references from the official company profile"
          description="The PDF portfolio documents overlay cladding, hard facing, specialised welding, cryogenic, fabrication and machining work carried out by Raghav Engineering."
          className="mb-16"
        />

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          <button
            onClick={() => handleCategoryChange("All")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold font-display transition-all duration-200 ${
              activeCategory === "All"
                ? "bg-navy text-white shadow-glow"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold font-display transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-navy text-white shadow-glow"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[0.4fr_1fr] gap-8 items-start">
          {/* Thumbnail Navigation */}
          <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2.5 pb-4 lg:pb-0 scrollbar-none">
            {filtered.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 shrink-0 ${
                  idx === activeIndex
                    ? "bg-navy text-white shadow-glow"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                <span className="font-mono-data text-[10px] font-bold text-accent shrink-0">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="text-xs font-display font-semibold leading-tight line-clamp-2">
                  {item.title}
                </span>
              </button>
            ))}
          </div>

          {/* Active Portfolio Item Display */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid md:grid-cols-[1.1fr_0.9fr]">
                  <div className="p-8 sm:p-10 flex flex-col justify-center">
                    <div className="inline-flex items-center gap-2 mb-4">
                      <span className="font-mono-data text-[10px] uppercase tracking-widest text-accent font-bold bg-accent/10 px-3 py-1 rounded-full">
                        {activeItem.category}
                      </span>
                      <span className="font-mono-data text-[10px] text-slate-400">
                        Portfolio #{String(filtered.indexOf(activeItem) + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-navy mb-4">
                      {activeItem.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      This portfolio item is documented in the official Raghav Engineering company profile PDF.
                    </p>
                  </div>

                  <div className="relative aspect-[4/3] md:aspect-auto min-h-[280px] bg-navy-950 overflow-hidden">
                    <img
                      src={activeItem.image}
                      alt={activeItem.title}
                      className="w-full h-full object-cover opacity-80"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="font-mono-data text-[9px] text-white/50 uppercase tracking-widest">
                        Raghav Engineering // Process Portfolio
                      </div>
                    </div>
                    <div className="absolute inset-4 border border-white/10 pointer-events-none" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}