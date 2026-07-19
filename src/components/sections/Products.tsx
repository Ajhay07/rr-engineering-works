import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Cpu, FileText } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { PRODUCTS } from "@/data/products";
import { Button } from "@/components/ui/button";

interface ProductsProps {
  onConfigureValve: (valveId: string) => void;
}

export function Products({ onConfigureValve }: ProductsProps) {
  const [activeTab, setActiveTab] = useState(PRODUCTS[0].id);

  const activeProduct = PRODUCTS.find((p) => p.id === activeTab) || PRODUCTS[0];

  const handleConfigureClick = () => {
    onConfigureValve(activeProduct.id);
    // Smooth scroll to configurator section
    const element = document.getElementById("configurator");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="products" className="bg-slate-50 py-24 sm:py-32 relative overflow-hidden">
      {/* Blueprint grid backdrop */}
      <div className="absolute inset-0 bg-blueprint opacity-30 pointer-events-none" />

      <div className="container relative z-10">
        <SectionHeading
          eyebrow="Capability Portfolio"
          title="Overlay cladding, specialised welding and machining capabilities"
          description="Select a capability to review the authentic process areas described in the official company profile."
          className="mb-16"
        />

        <div className="grid lg:grid-cols-[0.35fr_1fr] gap-10 items-start">
          {/* Left Side: Product Navigation List (Tactile tabs) */}
          <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 border-b lg:border-b-0 lg:border-l border-slate-200 pb-4 lg:pb-0 lg:pl-4 scrollbar-none shrink-0">
            {PRODUCTS.map((product) => {
              const isActive = product.id === activeTab;
              return (
                <button
                  key={product.id}
                  onClick={() => setActiveTab(product.id)}
                  className={`flex items-center gap-3 px-5 py-3.5 text-sm font-semibold rounded-lg text-left whitespace-nowrap lg:whitespace-normal transition-all duration-300 ${
                    isActive
                      ? "bg-navy text-white shadow-glow translate-x-1 border-l-4 border-accent"
                      : "text-slate-600 hover:text-navy hover:bg-slate-100"
                  }`}
                >
                  <span className="font-mono-data text-xs text-accent">
                    {String(PRODUCTS.findIndex((p) => p.id === product.id) + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display">{product.name}</span>
                </button>
              );
            })}
          </div>

          {/* Right Side: Immersive Product Details Panel */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden grid md:grid-cols-[1.1fr_0.9fr]">
            {/* Details and Technical Specs */}
            <div className="p-8 sm:p-10 flex flex-col justify-between">
              <div>
                {/* Active Tag */}
                <div className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 mb-6 text-accent">
                  <Cpu className="h-3.5 w-3.5" />
                  <span className="font-mono-data text-[10px] uppercase tracking-wider font-bold">
                    PDF Verified Capability
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProduct.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-navy mb-4">
                      {activeProduct.name}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-500 leading-relaxed mb-6">
                      {activeProduct.description}
                    </p>

                    {/* Technical Specification Grid */}
                    <div className="mb-7">
                      <h4 className="font-mono-data text-[10px] uppercase tracking-wider text-slate-400 mb-3">
                        Process Parameters
                      </h4>
                      <dl className="grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4 border border-slate-200/60 font-mono-data text-xs">
                        <div>
                          <dt className="text-slate-400 uppercase text-[9px] tracking-wider mb-1">
                            Materials / alloys
                          </dt>
                          <dd className="text-navy font-bold leading-tight">{activeProduct.material}</dd>
                        </div>
                        <div>
                          <dt className="text-slate-400 uppercase text-[9px] tracking-wider mb-1">
                            Process route
                          </dt>
                          <dd className="text-navy font-bold leading-tight">{activeProduct.process}</dd>
                        </div>
                        <div className="border-t border-slate-200 pt-3 mt-1">
                          <dt className="text-slate-400 uppercase text-[9px] tracking-wider mb-1">
                            Portfolio range
                          </dt>
                          <dd className="text-navy font-bold leading-tight">{activeProduct.sizeRange}</dd>
                        </div>
                        <div className="border-t border-slate-200 pt-3 mt-1">
                          <dt className="text-slate-400 uppercase text-[9px] tracking-wider mb-1">
                            Verification
                          </dt>
                          <dd className="text-navy font-bold leading-tight">Customer specification</dd>
                        </div>
                      </dl>
                    </div>

                    {/* Applications Tags */}
                    <div className="mb-8">
                      <h4 className="font-mono-data text-[10px] uppercase tracking-wider text-slate-400 mb-3">
                        Typical Applications
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {activeProduct.applications.map((app) => (
                          <span
                            key={app}
                            className="inline-flex items-center gap-1.5 text-xs rounded-lg bg-navy/5 text-navy px-3 py-1.5 font-medium border border-navy/5"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Configure CTA */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-100">
                <Button onClick={handleConfigureClick} className="bg-accent hover:bg-accent-hover text-white font-display flex-1 py-6 shadow-glow">
                  Configure &amp; Request RFQ
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button asChild variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 font-display py-6 px-6">
                  <a href="#resources">
                    <FileText className="mr-2 h-4 w-4" />
                    Company Profile
                  </a>
                </Button>
              </div>
            </div>

            {/* Product Image & Schematic Motif */}
            <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden bg-slate-900 flex items-center justify-center min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProduct.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <img
                    src={activeProduct.image}
                    alt={`${activeProduct.name} process portfolio`}
                    className="w-full h-full object-cover opacity-80"
                    loading="lazy"
                  />
                  {/* Overlay vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
                </motion.div>
              </AnimatePresence>

              {/* Crop marks overlay on image */}
              <div className="absolute inset-4 border border-white/10 pointer-events-none" />
              <div className="absolute top-6 left-6 font-mono-data text-[9px] text-white/50 tracking-widest uppercase">
                PROCESS. {activeProduct.slug.replace("-", "_").toUpperCase()}
              </div>

              <div className="absolute bottom-6 right-6 font-mono-data text-[10px] text-accent font-bold bg-navy-950/80 backdrop-blur px-2.5 py-1 rounded border border-white/10">
                {activeProduct.sizeRange}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
