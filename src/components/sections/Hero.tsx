import { ArrowRight, ClipboardCheck, Factory, MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY, HERO_METRICS } from "@/data/company";

export function Hero() {
  const handleWhatsAppInquiry = () => {
    const message = encodeURIComponent(
      "Hello Raghav Engineering, I am visiting your website and would like to discuss a welding, cladding or machining requirement."
    );
    if (COMPANY.phoneAlt) {
      window.open(`https://wa.me/${COMPANY.phoneAlt.replace(/\D/g, "")}?text=${message}`, "_blank");
    } else {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative overflow-hidden bg-[#111820] pt-28 text-white sm:pt-32">
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="/company-profile/pdf-page-06-image-01.jpg"
          alt=""
          className="h-full w-full object-cover opacity-24"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111820] via-[#111820]/92 to-[#111820]/72" />
      </div>

      <div className="container relative grid min-h-[calc(100vh-3rem)] items-center gap-10 pb-12 lg:grid-cols-[1fr_430px]">
        <div className="max-w-3xl py-12 sm:py-16">
          <div className="mb-6 inline-flex items-center gap-3 border-l-2 border-accent bg-white/7 px-4 py-2">
            <Factory className="h-4 w-4 text-accent" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/78">
              {COMPANY.tagline}
            </span>
          </div>

          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-normal text-white sm:text-6xl lg:text-7xl">
            Overlay cladding, specialised welding and precision machining for demanding components.
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
            {COMPANY.name} is specialised in nickel based overlay cladding, cobalt based hard facing,
            advanced welding, fabrication and precision machining for complex industrial applications.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-accent px-7 font-display text-white hover:bg-accent-hover">
              <a href="#contact">
                Send an RFQ
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              onClick={handleWhatsAppInquiry}
              size="lg"
              variant="outline"
              className="border-white/22 bg-white/8 font-display text-white hover:border-white hover:bg-white hover:text-navy"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              WhatsApp / Contact
            </Button>
          </div>

          <div className="mt-12 grid max-w-3xl grid-cols-2 border-y border-white/12 sm:grid-cols-4">
            {HERO_METRICS.map((metric) => (
              <div key={metric.label} className="border-white/12 py-5 pr-5 sm:border-r sm:last:border-r-0">
                <div className="font-display text-2xl font-semibold text-white sm:text-3xl">
                  {metric.value}
                  {"suffix" in metric ? metric.suffix : ""}
                </div>
                <div className="mt-1 text-xs leading-snug text-white/58">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>

        <aside className="mb-10 border border-white/14 bg-[#f7f5f0] p-6 text-navy shadow-2xl lg:mb-0">
          <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-steel">Buyer desk</p>
              <h2 className="mt-1 font-display text-2xl font-semibold">Start with the component. We will review the process route.</h2>
            </div>
            <ClipboardCheck className="h-8 w-8 text-accent" />
          </div>

          <dl className="mt-6 space-y-5 text-sm">
            <div>
              <dt className="font-semibold text-navy">Send us</dt>
              <dd className="mt-1 text-steel">Component details, material grade, drawing/photo, process expectation, quantity and delivery location.</dd>
            </div>
            <div>
              <dt className="font-semibold text-navy">Receive</dt>
              <dd className="mt-1 text-steel">A practical technical review before quotation, process selection and documentation planning.</dd>
            </div>
            <div>
              <dt className="font-semibold text-navy">Best fit for</dt>
              <dd className="mt-1 text-steel">Overlay cladding, hard facing, cryogenic welding, fabrication and precision machining enquiries.</dd>
            </div>
          </dl>

          <div className="mt-7 grid grid-cols-2 gap-3 border-t border-slate-200 pt-5 text-xs text-steel">
            <span>ISO 9001:2015 profile claim</span>
            <span>CMM inspection</span>
            <span>Radiographic-quality welding</span>
            <span>Chennai facility</span>
          </div>

          <a
            href={COMPANY.phoneAlt ? `tel:${COMPANY.phoneAlt.replace(/\s/g, "")}` : "#contact"}
            className="mt-7 flex items-center justify-center gap-2 bg-navy px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent"
          >
            <Phone className="h-4 w-4" />
            {COMPANY.phoneAlt ? `Call ${COMPANY.phoneAlt}` : "Contact details pending"}
          </a>
        </aside>
      </div>
    </section>
  );
}
