import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone, Mail, Award, MessageSquare, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, COMPANY } from "@/data/company";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setActiveHash(href);
    setMobileOpen(false);
  };

  const handleWhatsAppInquiry = () => {
    if (!COMPANY.phoneAlt) {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    const message = encodeURIComponent(`Hello ${COMPANY.name}, I am visiting your website and would like to request a quote/technical consultation.`);
    window.open(`https://wa.me/${COMPANY.phoneAlt.replace(/\D/g, "")}?text=${message}`, "_blank");
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-navy-950/90 backdrop-blur-md border-b border-white/10 shadow-soft"
            : "bg-transparent border-b border-white/5"
        )}
      >
        <nav
          className="container flex h-20 items-center justify-between"
          aria-label="Primary navigation"
        >
          {/* Logo Brand */}
          <a
            href="#home"
            onClick={() => handleNavClick("#home")}
            className="flex items-center gap-3 shrink-0 group"
            aria-label={`${COMPANY.name} home`}
          >
            <span className="flex h-11 w-11 items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <img
                src="/brand/raghav-engineering-logo.png"
                alt="Raghav Engineering"
                className="h-11 w-auto"
              />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display font-bold text-base sm:text-lg tracking-tight text-white">
                {COMPANY.shortName}
              </span>
              <span className="font-mono-data text-[10px] uppercase tracking-[0.14em] text-brand-200 mt-0.5">
                {COMPANY.foundedDisplay}
              </span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    "text-sm font-medium transition-colors relative py-2 text-white/80 hover:text-accent font-display",
                    activeHash === link.href && "text-accent border-b-2 border-accent"
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleWhatsAppInquiry}
              className="border-white/20 text-white bg-white/5 hover:bg-green-600 hover:border-green-500 font-display gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              Contact
            </Button>
            <Button asChild size="sm" className="bg-accent hover:bg-accent-hover text-white font-display">
              <a href="#configurator" onClick={() => handleNavClick("#configurator")}>
                Send RFQ
              </a>
            </Button>
          </div>

          {/* Hamburger Trigger */}
          <button
            className={cn(
              "lg:hidden flex h-11 w-11 items-center justify-center rounded-lg transition-colors border text-white",
              mobileOpen ? "border-white/20 bg-white/10" : "border-white/10 bg-white/5 hover:bg-white/10"
            )}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </header>

      {/* Full-screen Drawer Menu (robofest.in-style) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-navy-950 flex flex-col pt-24 overflow-hidden"
          >
            {/* Blueprint Grid Backdrop */}
            <div className="absolute inset-0 bg-blueprint-dark opacity-10 pointer-events-none" />

            <div className="container relative flex-1 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 overflow-y-auto pb-12">
              {/* Left Column: Nav Links */}
              <div className="flex flex-col justify-between">
                <ul className="flex flex-col gap-3 sm:gap-5">
                  {NAV_LINKS.map((link, idx) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05, duration: 0.4 }}
                    >
                      <a
                        href={link.href}
                        onClick={() => handleNavClick(link.href)}
                        className={cn(
                          "font-display text-3xl sm:text-4xl font-bold tracking-tight text-white hover:text-accent transition-colors block py-1.5",
                          activeHash === link.href && "text-accent"
                        )}
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-4 mt-10 pt-8 border-t border-white/10"
                >
                  <Button
                    onClick={handleWhatsAppInquiry}
                    className="bg-green-600 hover:bg-green-700 text-white font-display text-base py-6 flex-1 gap-2.5"
                  >
                    <MessageSquare className="h-5 w-5" />
                    Contact / WhatsApp Enquiry
                  </Button>
                  <Button
                    asChild
                    className="bg-accent hover:bg-accent-hover text-white font-display text-base py-6 flex-1"
                  >
                    <a href="#configurator" onClick={() => handleNavClick("#configurator")}>
                      Start Technical RFQ
                    </a>
                  </Button>
                </motion.div>
              </div>

              {/* Right Column: Technical Spec / Contact Card Panel (immersive details) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="hidden lg:flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-8"
              >
                <div>
                  <div className="flex items-center gap-2 mb-6 text-accent">
                    <Award className="h-5 w-5" />
                    <span className="font-mono-data text-xs uppercase tracking-wider">Manufacturing Integrity</span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white mb-3">
                    Cladding, Welding &amp; Machining Enquiry Support
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed mb-6">
                    Share the component, material, process expectation, drawings and quantity. The enquiry can then be reviewed against the company capability profile.
                  </p>

                  <div className="flex flex-col gap-4 border-t border-white/5 pt-6 text-white/70">
                    <div className="flex items-center gap-3">
                      <Phone className="h-4.5 w-4.5 text-accent shrink-0" />
                      <span className="text-sm font-mono-data">{COMPANY.phoneAlt || "Phone pending confirmation"}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4.5 w-4.5 text-accent shrink-0" />
                      <span className="text-sm font-mono-data">{COMPANY.email || "Email pending confirmation"}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-navy-950 border border-white/5 p-5 mt-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-white/50 font-mono-data">BUYER ACCESS</span>
                    <span className="text-[10px] bg-accent/20 text-accent font-bold px-2 py-0.5 rounded font-mono-data">PDF</span>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed mb-3.5">
                    Use the capability section and RFQ form to send the details needed for technical review.
                  </p>
                  <Button asChild size="sm" variant="outline" className="w-full text-xs font-display border-white/10 hover:bg-white hover:text-navy">
                    <a href="#configurator" onClick={() => handleNavClick("#configurator")}>
                      <Download className="h-3.5 w-3.5 mr-1.5" /> Open RFQ form
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
