import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText, X, CheckCircle, ShieldCheck, Mail, Building, User } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { RESOURCES } from "@/data/content";
import type { Resource } from "@/data/content";
import { Button } from "@/components/ui/button";

export function Resources() {
  const [activeDownload, setActiveDownload] = useState<Resource | null>(null);
  const [gatedName, setGatedName] = useState("");
  const [gatedCompany, setGatedCompany] = useState("");
  const [gatedEmail, setGatedEmail] = useState("");
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Check if they already provided details in the past (cached in localStorage)
  const handleDownloadClick = (resource: Resource) => {
    const cachedUser = localStorage.getItem("gated_user");
    if (cachedUser) {
      // Direct download simulation if already filled in past
      triggerFileDownload(resource);
    } else {
      setActiveDownload(resource);
      setDownloadSuccess(false);
    }
  };

  const triggerFileDownload = (resource: Resource) => {
    // In a production app, this would trigger a download link:
    // window.open(`/downloads/${resource.id}.pdf`, "_blank");
    
    // Design simulation: trigger a download log / mock action
    console.log(`Downloading: ${resource.title}`);
    
    // Show download prompt info
    setDownloadSuccess(true);
    
    setTimeout(() => {
      // Auto close after 2 seconds
      setActiveDownload(null);
      setDownloadSuccess(false);
    }, 2500);
  };

  const handleGatedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gatedName || !gatedEmail || !gatedCompany) return;

    // Cache user credentials to avoid repeated prompts
    localStorage.setItem("gated_user", JSON.stringify({ name: gatedName, email: gatedEmail, company: gatedCompany }));
    
    if (activeDownload) {
      triggerFileDownload(activeDownload);
    }
  };

  return (
    <section id="resources" className="bg-slate-50 py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none" />

      <div className="container relative z-10">
        <SectionHeading
          eyebrow="Technical Resources"
          title="Access Engineering Specifications &amp; Design Catalogues"
          description="Download dimensional sheets, material charts, standard ratings, and installation procedures compiled by our engineering team."
          className="mb-16"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {RESOURCES.map((resource) => (
            <div
              key={resource.id}
              className="group bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-card-hover hover:border-accent/40 transition-all duration-300 h-full"
            >
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy/5 text-navy group-hover:bg-accent group-hover:text-white transition-colors duration-300 mb-5">
                  <FileText className="h-5.5 w-5.5" />
                </div>
                <span className="font-mono-data text-[10px] text-accent uppercase tracking-widest font-bold">
                  {resource.fileType} · {resource.fileSize}
                </span>
                <h3 className="font-display font-semibold text-navy text-lg mt-2 mb-2">
                  {resource.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {resource.description}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100">
                <Button
                  onClick={() => handleDownloadClick(resource)}
                  variant="outline"
                  className="w-full text-xs font-display justify-center gap-2 border-slate-200 hover:border-accent hover:text-accent"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download Document
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gated Lead Capture Modal */}
      <AnimatePresence>
        {activeDownload && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveDownload(null)}
              className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white border border-slate-200 rounded-2xl w-full max-w-md p-6 sm:p-8 relative shadow-card-hover z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveDownload(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-navy hover:bg-slate-100 p-1.5 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              {downloadSuccess ? (
                // Mock Success State
                <div className="text-center py-6 flex flex-col items-center justify-center">
                  <CheckCircle className="h-14 w-14 text-green-600 mb-4 animate-bounce" />
                  <h3 className="font-display font-bold text-navy text-xl mb-2">
                    Preparing Download
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-xs leading-relaxed font-mono-data mb-4">
                    Preparing standard {activeDownload.title}.pdf ({activeDownload.fileSize}) for delivery.
                  </p>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      className="bg-accent h-full"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2 }}
                    />
                  </div>
                  <span className="text-[10px] text-green-600 font-bold mt-4 font-mono-data flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4" /> Material verification complete
                  </span>
                </div>
              ) : (
                // Input Form State
                <div>
                  <div className="flex items-center gap-2 text-accent mb-3">
                    <ShieldCheck className="h-4 w-4" />
                    <span className="font-mono-data text-[10px] uppercase tracking-widest font-bold">
                      Business Portal Verification
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-navy text-xl mb-1.5">
                    Download Specifications
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6">
                    Enter your professional business email and company name to immediately unlock access to our technical catalog sheets.
                  </p>

                  <form onSubmit={handleGatedSubmit} className="flex flex-col gap-4">
                    <div>
                      <label className="block text-[10px] font-mono-data uppercase text-slate-400 mb-1.5 tracking-wider">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={gatedName}
                          onChange={(e) => setGatedName(e.target.value)}
                          className="w-full rounded-lg border border-slate-200 px-4 py-2.5 pl-10 text-xs focus:outline-none focus:border-accent text-navy"
                          placeholder="Your full name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono-data uppercase text-slate-400 mb-1.5 tracking-wider">
                        Company Name
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={gatedCompany}
                          onChange={(e) => setGatedCompany(e.target.value)}
                          className="w-full rounded-lg border border-slate-200 px-4 py-2.5 pl-10 text-xs focus:outline-none focus:border-accent text-navy"
                          placeholder="e.g. Reliance, Shell, Tata"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono-data uppercase text-slate-400 mb-1.5 tracking-wider">
                        Business Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <input
                          type="email"
                          required
                          value={gatedEmail}
                          onChange={(e) => setGatedEmail(e.target.value)}
                          className="w-full rounded-lg border border-slate-200 px-4 py-2.5 pl-10 text-xs focus:outline-none focus:border-accent text-navy"
                          placeholder="you@company.com"
                        />
                      </div>
                    </div>

                    <Button type="submit" className="bg-accent hover:bg-accent-hover text-white font-display py-6 mt-2">
                      <Download className="mr-2 h-4 w-4" /> Download {activeDownload.fileType}
                    </Button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
