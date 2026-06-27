import { useState, type FormEvent } from "react";
import { CheckCircle2, Clock, Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/data/site";
import { PRODUCTS } from "@/data/products";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<"domestic" | "export">("domestic");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const lines = [
      "New website RFQ enquiry",
      "",
      `Enquiry type: ${activeTab === "export" ? "International export" : "Domestic enquiry"}`,
      `Name: ${form.get("name") || ""}`,
      `Company: ${form.get("company") || ""}`,
      `Email: ${form.get("email") || ""}`,
      `Phone: ${form.get("phone") || ""}`,
      `Valve category: ${form.get("valveType") || ""}`,
      `Destination / GSTIN: ${form.get("destination") || form.get("gstin") || ""}`,
      "",
      "Requirement:",
      String(form.get("message") || ""),
    ];
    const subject = encodeURIComponent("Website RFQ enquiry - RR Engineering Works");
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${COMPANY.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const handleWhatsAppInquiry = () => {
    const message = encodeURIComponent(
      "Hello RR Engineering Works, I am visiting your website and would like to send an RFQ."
    );
    window.open(`https://wa.me/919841027563?text=${message}`, "_blank");
  };

  return (
    <section id="contact" className="bg-[#f7f5f0] py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Talk to sales"
          title="Send a valve requirement and start the quotation conversation"
          description="Use the form for structured RFQs, or call/WhatsApp for urgent replacement and project discussions. The form opens your email app with the enquiry details ready to send."
          className="mb-14"
        />

        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <Reveal>
            <div className="bg-navy p-7 text-white sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">RR Engineering Works</p>
              <h3 className="mt-3 font-display text-2xl font-semibold">Direct contact</h3>

              <ul className="mt-7 space-y-6">
                <li className="flex gap-4">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <p className="text-sm leading-7 text-white/76">
                    {COMPANY.address.line1}, {COMPANY.address.line2}, {COMPANY.address.city} - {COMPANY.address.pincode}, {COMPANY.address.country}
                  </p>
                </li>
                <li className="flex gap-4">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <div className="text-sm leading-7 text-white/76">
                    <a href={`tel:${COMPANY.phoneAlt.replace(/\s/g, "")}`} className="hover:text-white">{COMPANY.phoneAlt}</a>
                    <br />
                    <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="hover:text-white">{COMPANY.phone}</a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <div className="text-sm leading-7 text-white/76">
                    <a href={`mailto:${COMPANY.email}`} className="hover:text-white">{COMPANY.email}</a>
                    <br />
                    <a href={`mailto:${COMPANY.exportEmail}`} className="hover:text-white">{COMPANY.exportEmail}</a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <p className="text-sm leading-7 text-white/76">{COMPANY.hours.weekdays}</p>
                </li>
              </ul>

              <div className="mt-8 grid gap-3 border-t border-white/12 pt-6 sm:grid-cols-2 lg:grid-cols-1">
                <Button onClick={handleWhatsAppInquiry} className="bg-green-600 font-display text-white hover:bg-green-700">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  WhatsApp enquiry
                </Button>
                <Button asChild variant="outline" className="border-white/24 bg-white/8 font-display text-white hover:bg-white hover:text-navy">
                  <a href={`mailto:${COMPANY.email}`}>Email sales team</a>
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="border border-slate-200 bg-white p-6 sm:p-8">
              {submitted && (
                <div className="mb-6 flex items-start gap-3 border border-green-200 bg-green-50 p-4 text-sm text-green-800">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                  <p>Your email app should now show the enquiry draft. Send it from there so the sales team receives your details.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2 grid grid-cols-2 gap-2 border border-slate-200 bg-slate-50 p-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab("domestic")}
                    className={`px-4 py-2.5 text-sm font-semibold transition-colors ${
                      activeTab === "domestic" ? "bg-navy text-white" : "text-slate-600 hover:bg-white"
                    }`}
                  >
                    Domestic enquiry
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("export")}
                    className={`px-4 py-2.5 text-sm font-semibold transition-colors ${
                      activeTab === "export" ? "bg-navy text-white" : "text-slate-600 hover:bg-white"
                    }`}
                  >
                    Export enquiry
                  </button>
                </div>

                <Field id="name" label="Contact name" required placeholder="Your name" />
                <Field id="company" label="Company name" required placeholder="Company / plant name" />
                <Field id="email" label="Business email" type="email" required placeholder="you@company.com" />
                <Field id="phone" label="Phone" type="tel" placeholder="+91 00000 00000" />

                {activeTab === "export" ? (
                  <Field id="destination" label="Destination port / country" required placeholder="e.g. Dubai, Singapore" />
                ) : (
                  <Field id="gstin" label="GSTIN / location" placeholder="GSTIN or city" />
                )}

                <div>
                  <label htmlFor="valveType" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Valve category
                  </label>
                  <select
                    id="valveType"
                    name="valveType"
                    className="w-full border border-slate-200 bg-white px-4 py-3 text-sm text-navy focus:border-accent focus:outline-none"
                    defaultValue=""
                  >
                    <option value="" disabled>Select valve type</option>
                    {PRODUCTS.map((p) => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                    <option value="Custom / not sure">Custom / not sure</option>
                  </select>
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
                    placeholder="Example: 6 inch ball valve, Class 150, WCB body, SS trim, water line, 12 nos, delivery to Chennai."
                  />
                </div>

                <div className="sm:col-span-2">
                  <Button type="submit" className="w-full bg-accent py-6 font-display text-white hover:bg-accent-hover">
                    <Send className="mr-2 h-4 w-4" />
                    Prepare email enquiry
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
