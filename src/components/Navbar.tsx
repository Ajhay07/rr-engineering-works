import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MessageSquare, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY, NAV_LINKS } from "@/data/company";
import { cn } from "@/lib/utils";

const ANCHOR_IDS = NAV_LINKS.filter((l) => l.href.startsWith("#")).map(
  (l) => l.href.slice(1)
);

interface NavLinkItemProps {
  href: string;
  label: string;
  onClick: () => void;
  active: boolean;
  mobile?: boolean;
}

function NavLinkItem({
  href,
  label,
  onClick,
  active,
  mobile = false,
}: NavLinkItemProps) {
  if (mobile) {
    const base =
      "font-display text-3xl sm:text-4xl font-bold tracking-tight text-white hover:text-accent transition-colors block py-2";
    if (href.startsWith("/"))
      return (
        <Link to={href} onClick={onClick} className={base}>
          {label}
        </Link>
      );
    return (
      <a
        href={href}
        onClick={onClick}
        className={cn(base, active && "text-accent")}
      >
        {label}
      </a>
    );
  }

  const base =
    "text-sm font-medium transition-colors relative py-2 text-white/80 hover:text-accent font-display";
  if (href.startsWith("/"))
    return (
      <Link to={href} onClick={onClick} className={base}>
        {label}
      </Link>
    );
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(base, active && "text-accent border-b-2 border-accent")}
    >
      {label}
    </a>
  );
}

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
    const elements = ANCHOR_IDS.map((id) => document.getElementById(id)).filter(
      Boolean
    );
    if (!elements.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          setActiveHash(`#${visible[0].target.id}`);
        }
      },
      { threshold: [0.25, 0.5, 0.75] }
    );
    elements.forEach((el) => observer.observe(el));
    const ro = observer;
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
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
    const message = encodeURIComponent(
      `Hello ${COMPANY.name}, I'd like to request a quote/technical consultation.`
    );
    window.open(
      `https://wa.me/${COMPANY.phoneAlt.replace(/\D/g, "")}?text=${message}`,
      "_blank"
    );
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
          <Link
            to="/"
            onClick={() => handleNavClick("#home")}
            className="flex items-center gap-3 shrink-0 group"
            aria-label={`${COMPANY.name} home`}
          >
            <span className="flex h-11 w-11 items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <img
                src="/brand/raghav-engineering-logo.png"
                alt={COMPANY.name}
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
          </Link>
                    <ul className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.slice(0, NAV_LINKS.length - 1).map((link) => (
              <li key={link.href}>
                <NavLinkItem
                  href={link.href}
                  label={link.label}
                  onClick={() => handleNavClick(link.href)}
                  active={activeHash === link.href}
                />
              </li>
            ))}
          </ul>

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
            <Button
              asChild
              size="sm"
              className="bg-accent hover:bg-accent-hover text-white font-display"
            >
              <Link
                to="#contact"
                onClick={() => handleNavClick("#contact")}
              >
                Send RFQ
              </Link>
            </Button>
          </div>

          <button
            className={cn(
              "lg:hidden flex h-11 w-11 items-center justify-center rounded-lg transition-colors border text-white",
              mobileOpen
                ? "border-white/20 bg-white/10"
                : "border-white/10 bg-white/5 hover:bg-white/10"
            )}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </header>
            {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="fixed top-0 right-0 z-50 flex h-full w-80 max-w-[85vw] flex-col gap-6 overflow-y-auto bg-navy-950 border-l border-slate-800 p-6 shadow-soft lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between">
                <Link
                  to="/"
                  onClick={() => handleNavClick("#home")}
                  className="flex items-center gap-3"
                  aria-label={`${COMPANY.name} home`}
                >
                  <img
                    src="/brand/raghav-engineering-logo.png"
                    alt={COMPANY.name}
                    className="h-10 w-auto"
                  />
                  <span className="font-display font-bold text-white">
                    {COMPANY.shortName}
                  </span>
                </Link>
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 text-white hover:bg-slate-800"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav aria-label="Mobile navigation">
                <ul className="flex flex-col gap-1">
                  {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <NavLinkItem
                        href={link.href}
                        label={link.label}
                        onClick={() => handleNavClick(link.href)}
                        active={activeHash === link.href}
                        mobile
                      />
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-auto flex flex-col gap-3 border-t border-slate-800 pt-6">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    handleNavClick("#contact");
                    handleWhatsAppInquiry();
                  }}
                  className="border-white/20 text-white bg-white/5 hover:bg-green-600 hover:border-green-500 font-display gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  Contact
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="bg-accent hover:bg-accent-hover text-white font-display"
                >
                  <Link
                    to="#contact"
                    onClick={() => handleNavClick("#contact")}
                  >
                    Send RFQ
                  </Link>
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
