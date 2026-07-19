import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Clock, Loader2, Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { COMPANY, RFQ_ENDPOINT, RFQ_WEBHOOK_HELP } from "@/data/company";
import { PRODUCTS } from "@/data/products";

type SubmitState = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [submitted, setSubmitted] = useState<SubmitState>("idle");
  const [activeTab, setActiveTab] = useState<"domestic" | "export">("domestic");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted("loading");
    setStatusMessage("");

    if (!RFQ_ENDPOINT) {
      setSubmitted("error");
      setStatusMessage(RFQ_WEBHOOK_HELP);
      return;
    }

    try {
      const formData = new FormData(event.currentTarget);
      formData.append("enquiryType", activeTab);
      const response = await fetch(RFQ_ENDPOINT, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed");
      event.currentTarget.reset();
      setSubmitted("success");
      setStatusMessage("Your enquiry was submitted successfully.");
    } catch {
      setSubmitted("error");
      setStatusMessage("The enquiry could not be submitted. Please confirm the RFQ backend endpoint.");
    }
  };

  const handleWhatsAppInquiry = () => {
    if (!COMPANY.phoneAlt) {
      setSubmitted("error");
      setStatusMessage("Client phone / WhatsApp number is not confirmed in the supplied PDF.");
      return;
    }
    const message = encodeURIComponent(
      `Hello ${COMPANY.name}, I am visiting your website and would like to send an RFQ.`
    );
    window.open(`https://wa.me/${COMPANY.phoneAlt.replace(/\D/g, "")}?text=${message}`, "_blank");
  };

  return (
    <section id="contact" className="bg-[#f7f5f0] py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Talk to sales"
          title="Send a cladding, welding, machining or fabrication requirement"
          description="The supplied PDF does not include final phone or email details. The form is ready for a real backend endpoint and will not fake a successful submission."
          className="mb-14"
        />

        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <Reveal>
            <div className="bg-navy p-7 text-white sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{COMPANY.name}</p>
              <h3 className="mt-3 font-display text-2xl font-semibold">Direct contact</h3>

              <ul className="mt-7 space-y-6">
                <li className="flex gap-4">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <p className="text-sm leading-7 text-white/76">
                    {COMPANY.address.line1}, {COMPANY.address.line2}, {COMPANY.address.city}, {COMPANY.address.country}
                  </p>
                </li>
                <li className="flex gap-4">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <p className="text-sm leading-7 text-white/76">
                    {COMPANY.phoneAlt || "Phone / WhatsApp number to be confirmed by client"}
                  </p>
                </li>
                <li className="flex gap-4">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <p className="text-sm leading-7 text-white/76">
                    {COMPANY.email || "Sales email to be confirmed by client"}
                  </p>
                </li>
                <li className="flex gap-4">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <p className="text-sm leading-7 text-white/76">{COMPANY.hours.weekdays}</p>
                </li>
              </ul>

              <div id="client-confirmation" className="mt-8 border-t border-white/12 pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Needs client confirmation</p>
                <ul className="mt-4 space-y-2 text-xs leading-5 text-white/65">
                  {COMPANY.confirmationNeeded.map((item) => (
                    <li key={item} className="flex gap-2">
                      <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 grid gap-3 border-t border-white/12 pt-6 sm:grid-cols-2 lg:grid-cols-1">
                <Button onClick={handleWhatsAppInquiry} className="bg-green-600 font-display text-white hover:bg-green-700 disabled:opacity-60" disabled={!COMPANY.phoneAlt}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  WhatsApp enquiry
                </Button>
                <Button asChild variant="outline" className="border-white/24 bg-white/8 font-display text-white hover:bg-white hover:text-navy">
                  <a href={COMPANY.email ? `mailto:${COMPANY.email}` : "#client-confirmation"}>Email sales team</a>
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="border border-slate-200 bg-white p-6 sm:p-8">
              {statusMessage && (
                <div className={`mb-6 flex items-start gap-3 border p-4 text-sm ${
                  submitted === "success" ? "border-green-200 bg-green-50 text-green-800" : "border-amber-200 bg-amber-50 text-amber-900"
                }`}>
                  {submitted === "success" ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" /> : <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />}
                  <p>{statusMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2 grid grid-cols-2 gap-2 border border-slate-200 bg-slate-50 p-1">
                  <ToggleButton active={activeTab === "domestic"} onClick={() => setActiveTab("domestic")}>Domestic enquiry</ToggleButton>
                  <ToggleButton active={activeTab === "export"} onClick={() => setActiveTab("export")}>Export enquiry</ToggleButton>
                </div>

                <Field id="name" label="Contact name" required placeholder="Your name" />
                <Field id="company" label="Company name" required placeholder="Company / plant name" />
                <Field id="email" label="Business email" type="email" required placeholder="you@company.com" />
                <Field id="phone" label="Phone" type="tel" placeholder="+91 00000 00000" />
                <Field id="component" label="Component / assembly" required placeholder="Valve body, spool joint, bonnet, etc." />

                <div>
                  <label htmlFor="capability" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Capability
                  </label>
                  <select
                    id="capability"
                    name="capability"
                    className="w-full border border-slate-200 bg-white px-4 py-3 text-sm text-navy focus:border-accent focus:outline-none"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>Select requirement</option>
                    {PRODUCTS.map((item) => (
                      <option key={item.id} value={item.name}>{item.name}</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="attachment" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Drawing / datasheet / photo
                  </label>
                  <input id="attachment" name="attachment" type="file" className="w-full border border-slate-200 px-4 py-3 text-sm text-navy file:mr-4 file:border-0 file:bg-navy file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white" />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Requirement details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full resize-none border border-slate-200 px-4 py-3 text-sm text-navy focus:border-accent focus:outline-none"
                    placeholder="Material grade, process expectation, coating/cladding area, quantity, inspection requirement and delivery location."
                  />
                </div>

                <div className="sm:col-span-2">
                  <Button type="submit" disabled={submitted === "loading"} className="w-full bg-accent py-6 font-display text-white hover:bg-accent-hover disabled:opacity-70">
                    {submitted === "loading" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                    Submit enquiry
                  </Button>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ToggleButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2.5 text-sm font-semibold transition-colors ${
        active ? "bg-navy text-white" : "text-slate-600 hover:bg-white"
      }`}
    >
      {children}
    </button>
  );
}

function Field({
  id,
  label,
  type = "text",
  required = false,
  placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
        {label}{required ? " *" : ""}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="w-full border border-slate-200 px-4 py-3 text-sm text-navy focus:border-accent focus:outline-none"
        placeholder={placeholder}
      />
    </div>
  );
}
