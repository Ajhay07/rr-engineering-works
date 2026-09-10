import { useState } from "react";
import {
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { createRFQ } from "@/services/rfq-service";
import { COMPANY } from "@/data/company";
import { PRODUCTS } from "@/data/products";
import type { CreateRFQInput } from "@/types/rfq";

type SubmitState = "idle" | "loading" | "success" | "error";

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

export function Contact() {
  const [submitted, setSubmitted] = useState<SubmitState>("idle");
  const [submitError, setSubmitError] = useState("");
  const [resultRef, setResultRef] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted("loading");
    setSubmitError("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload: CreateRFQInput = {
      customerName: (data.get("name") as string)?.trim() ?? "",
      companyName: (data.get("company") as string)?.trim() ?? "",
      email: (data.get("email") as string)?.trim() ?? "",
      phone: (data.get("phone") as string)?.trim() ?? "",
      productService: (data.get("capability") as string)?.trim() ?? "",
      component: (data.get("component") as string)?.trim() ?? "",
      quantity: (data.get("quantity") as string)?.trim() ?? "",
      deliveryDate: (data.get("deliveryDate") as string)?.trim() ?? "",
      requirement: (data.get("requirement") as string)?.trim() ?? "",
      additionalNotes: (data.get("notes") as string)?.trim() ?? "",
      attachmentName: (data.get("attachment") as File | null)?.name ?? "",
    };

    try {
      const rfq = await createRFQ(payload);
      setResultRef(rfq.reference);
      setSubmitted("success");
      form.reset();
    } catch (e) {
      setSubmitted("error");
      setSubmitError(
        e instanceof Error ? e.message : "Could not submit your enquiry."
      );
    }
  };

  return (
    <section id="contact" className="bg-[#f7f5f0] py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Talk to sales"
          title="Send an RFQ"
          description="Share your component, material, process and delivery expectations. We respond with a technical review and quotation. Your enquiry is stored securely in the Client Portal where you can track its status."
          className="mb-14"
        />

        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <Reveal>
            <div className="relative overflow-hidden rounded-xl bg-navy p-7 text-white sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                {COMPANY.name}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold">
                Direct contact
              </h3>

              <ul className="mt-7 space-y-6">
                <li className="flex gap-4">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <p className="text-sm leading-7 text-white/76">
                    {COMPANY.address.line1}, {COMPANY.address.line2},{" "}
                    {COMPANY.address.city}, {COMPANY.address.country}
                  </p>
                </li>
                <li className="flex gap-4">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <p className="text-sm leading-7 text-white/76">
                    {COMPANY.phoneAlt ||
                      "Phone / WhatsApp number to be confirmed"}
                  </p>
                </li>
                <li className="flex gap-4">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <p className="text-sm leading-7 text-white/76">
                    {COMPANY.email || "Sales email to be confirmed"}
                  </p>
                </li>
              </ul>

              <Button
                onClick={handleWhatsAppInquiry}
                className="mt-8 w-full bg-accent font-display text-white hover:bg-accent-hover"
              >
                <Phone className="mr-2 h-4 w-4" />
                WhatsApp / Call
              </Button>
            </div>
          </Reveal>

          <Reveal>
            <div className="bg-white p-7 shadow-soft sm:p-8 rounded-xl">
              {submitted === "success" ? (
                <div className="text-center">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-green-500" />
                  <h3 className="mt-3 font-display text-xl font-semibold text-navy">
                    Thank you for your enquiry
                  </h3>
                  <p className="mt-2 text-slate-600">
                    Your RFQ reference
                    <span className="font-mono-data font-semibold text-accent">
                      {resultRef}
                    </span>
                    has been received and stored in the Client Portal.
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    A member of our team will review your requirement and reply
                    with a technical review and quotation.
                  </p>
                  <Button
                    asChild
                    className="mt-6 w-full bg-accent font-display text-white hover:bg-accent-hover"
                  >
                    <a href="/client-portal/login">Open Client Portal</a>
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {submitted === "loading" && (
                    <Alert variant="info" className="mb-2">
                      Submitting your enquiry…
                    </Alert>
                  )}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                      label="Company"
                      name="company"
                      required
                      placeholder="Your company name"
                    />
                    <Input
                      label="Your name"
                      name="name"
                      required
                      placeholder="Full name"
                    />
                    <Input
                      label="Email address"
                      type="email"
                      name="email"
                      required
                      placeholder="you@company.com"
                    />
                    <Input
                      label="Phone"
                      type="tel"
                      name="phone"
                      placeholder="+91 00000 00000"
                    />
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="capability"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500"
                      >
                        Capability *
                      </label>
                      <select
                        id="capability"
                        name="capability"
                        required
                        defaultValue=""
                        className="w-full border border-slate-200 bg-white px-4 py-3 text-sm text-navy focus:border-accent focus:outline-none"
                      >
                        <option value="" disabled>
                          Select requirement
                        </option>
                        {PRODUCTS.map((item) => (
                          <option key={item.id} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <Input
                      label="Component / assembly"
                      name="component"
                      required
                      placeholder="Valve body, spool joint, bonnet, etc."
                    />
                    <Input
                      label="Quantity"
                      name="quantity"
                      placeholder="e.g. 4 nos, 1 lot"
                    />
                    <Input
                      label="Delivery date"
                      type="date"
                      name="deliveryDate"
                    />
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="attachment"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500"
                      >
                        Drawing / datasheet / photo
                      </label>
                      <input
                        id="attachment"
                        name="attachment"
                        type="file"
                        className="w-full border border-slate-200 bg-white px-4 py-2 text-sm text-navy file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-navy file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="requirement"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500"
                      >
                        Requirement details *
                      </label>
                      <textarea
                        id="requirement"
                        name="requirement"
                        rows={5}
                        required
                        placeholder="Material grade, process expectation, coating/cladding area, quantity and inspection requirement."
                        className="w-full resize-none border border-slate-200 bg-white px-4 py-3 text-sm text-navy focus:border-accent focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="notes"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500"
                      >
                        Additional notes
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        rows={3}
                        placeholder="Heat number, certification, special packaging, etc."
                        className="w-full resize-none border border-slate-200 bg-white px-4 py-3 text-sm text-navy focus:border-accent focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Button
                        type="submit"
                        disabled={submitted === "loading"}
                        className="w-full bg-accent py-6 font-display text-white hover:bg-accent-hover disabled:opacity-70"
                      >
                        {submitted === "loading" ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting…
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Submit enquiry
                          </>
                        )}
                      </Button>
                    </div>
                    {submitError && (
                      <Alert variant="error" className="sm:col-span-2 mt-2">
                        {submitError}
                      </Alert>
                    )}
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
