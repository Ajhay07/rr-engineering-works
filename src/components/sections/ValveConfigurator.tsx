import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowLeft, ArrowRight, Check, Loader2, Paperclip, Send } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { COMPANY, RFQ_ENDPOINT, RFQ_WEBHOOK_HELP, SPECIAL_MATERIALS, WELDING_PROCESSES } from "@/data/company";
import { Button } from "@/components/ui/button";

interface ValveConfiguratorProps {
  selectedValveId: string;
  setSelectedValveId: (id: string) => void;
}

type SubmitState = "idle" | "loading" | "success" | "error";

const PROJECT_TYPES = [
  "Overlay cladding",
  "Hard facing",
  "Specialised welding",
  "Precision machining",
  "Fabrication / assembly",
  "Cryogenic application",
  "Not sure - need review",
];

export function ValveConfigurator({ selectedValveId, setSelectedValveId }: ValveConfiguratorProps) {
  const [step, setStep] = useState(1);
  const [capabilityId, setCapabilityId] = useState(PRODUCTS[0].id);
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
  const [material, setMaterial] = useState(SPECIAL_MATERIALS[0]);
  const [process, setProcess] = useState(WELDING_PROCESSES[0]);
  const [component, setComponent] = useState("");
  const [quantity, setQuantity] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (selectedValveId) {
      setCapabilityId(selectedValveId);
      setStep(2);
    }
  }, [selectedValveId]);

  const activeCapability = PRODUCTS.find((item) => item.id === capabilityId) || PRODUCTS[0];

  const rfqReference = useMemo(() => {
    const seed = `${capabilityId}-${company}-${Date.now()}`.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
    return `RFQ-RE-${seed || "DRAFT"}`;
  }, [capabilityId, company]);

  const handleNext = () => setStep((current) => Math.min(current + 1, 3));
  const handlePrev = () => setStep((current) => Math.max(current - 1, 1));

  const resetForm = () => {
    setStep(1);
    setSelectedValveId("");
    setComponent("");
    setQuantity("");
    setName("");
    setCompany("");
    setEmail("");
    setPhone("");
    setNotes("");
    setFile(null);
    setSubmitState("idle");
    setMessage("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitState("loading");
    setMessage("");

    if (!RFQ_ENDPOINT) {
      setSubmitState("error");
      setMessage(RFQ_WEBHOOK_HELP);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("reference", rfqReference);
      formData.append("capability", activeCapability.name);
      formData.append("projectType", projectType);
      formData.append("material", material);
      formData.append("process", process);
      formData.append("component", component);
      formData.append("quantity", quantity);
      formData.append("name", name);
      formData.append("company", company);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("notes", notes);
      if (file) formData.append("attachment", file);

      const response = await fetch(RFQ_ENDPOINT, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setSubmitState("success");
      setMessage("Your RFQ was submitted successfully. The team can now review the technical details.");
    } catch {
      setSubmitState("error");
      setMessage("The RFQ could not be submitted. Please check the backend endpoint or try again later.");
    }
  };

  return (
    <section id="configurator" className="bg-navy-950 text-white py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-blueprint-dark opacity-10 pointer-events-none" />
      <div className="absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 font-mono-data text-xs font-medium uppercase tracking-[0.18em] mb-4 text-accent">
            <span className="h-px w-6 bg-accent" />
            Technical Procurement
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.15] text-white">
            Cladding, welding and machining RFQ assistant
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/60 leading-relaxed">
            Share the component, material, process expectation, quantity and drawings so the enquiry can be reviewed against the official capability profile.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-stretch">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-8 flex flex-col justify-between min-h-[550px]">
            <form onSubmit={handleSubmit} className="flex flex-col justify-between flex-1">
              <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                <span className="font-mono-data text-[10px] uppercase tracking-wider text-white/50">
                  STEP {step} OF 3
                </span>
                <div className="flex gap-1.5">
                  {[1, 2, 3].map((item) => (
                    <span
                      key={item}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        item === step ? "w-6 bg-accent" : "w-2 bg-white/15"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex-1 mb-8">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div key="step-1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid sm:grid-cols-2 gap-4">
                      <StepIntro title="Select capability" text="Choose the closest service area. The team can correct this during technical review." />
                      {PRODUCTS.map((item) => (
                        <Choice key={item.id} checked={capabilityId === item.id} label={item.name} onClick={() => setCapabilityId(item.id)} />
                      ))}
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div key="step-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid sm:grid-cols-2 gap-5">
                      <StepIntro title="Technical requirement" text="Add the process, material, component and quantity known at enquiry stage." />
                      <Select label="Project type" value={projectType} onChange={setProjectType} options={PROJECT_TYPES} />
                      <Select label="Material / alloy" value={material} onChange={setMaterial} options={SPECIAL_MATERIALS} />
                      <Select label="Preferred process" value={process} onChange={setProcess} options={WELDING_PROCESSES} />
                      <Input label="Quantity" value={quantity} onChange={setQuantity} placeholder="e.g. 12 nos / 1 lot" required />
                      <div className="sm:col-span-2">
                        <Input label="Component / assembly" value={component} onChange={setComponent} placeholder="e.g. cryogenic bonnet, valve body, spool joint" required />
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div key="step-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid sm:grid-cols-2 gap-5">
                      <StepIntro title="Contact and files" text="Attach drawings, photos or datasheets if available. Submissions require a configured backend endpoint." />
                      <Input label="Full name" value={name} onChange={setName} placeholder="Your name" required />
                      <Input label="Company" value={company} onChange={setCompany} placeholder="Company name" required />
                      <Input label="Business email" type="email" value={email} onChange={setEmail} placeholder="you@company.com" required />
                      <Input label="Phone / WhatsApp" type="tel" value={phone} onChange={setPhone} placeholder="+91 00000 00000" />
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-mono-data text-white/60 mb-2 uppercase tracking-wider">
                          Drawings / files
                        </label>
                        <label className="flex min-h-14 cursor-pointer items-center gap-3 rounded-lg border border-white/10 bg-navy-950 px-4 py-3 text-xs text-white/70 hover:border-accent">
                          <Paperclip className="h-4 w-4 text-accent" />
                          <span className="truncate">{file ? file.name : "Upload drawing, datasheet or photo"}</span>
                          <input type="file" className="sr-only" onChange={(event) => setFile(event.target.files?.[0] || null)} />
                        </label>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-mono-data text-white/60 mb-2 uppercase tracking-wider">
                          Notes
                        </label>
                        <textarea
                          rows={3}
                          value={notes}
                          onChange={(event) => setNotes(event.target.value)}
                          className="w-full rounded-lg border border-white/10 bg-navy-950 px-4 py-3 text-xs text-white focus:outline-none focus:border-accent resize-none"
                          placeholder="Service condition, inspection requirement, delivery expectation or special instructions."
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {message && (
                <div className={`mb-5 flex items-start gap-3 rounded-lg border p-4 text-sm ${
                  submitState === "success" ? "border-green-500/30 bg-green-500/10 text-green-100" : "border-amber-500/30 bg-amber-500/10 text-amber-100"
                }`}>
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{message}</span>
                </div>
              )}

              <div className="flex gap-4 border-t border-white/5 pt-6 mt-4">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={handlePrev} className="border-white/15 text-white hover:bg-white/5 font-display flex-1 py-5">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                )}
                {step < 3 ? (
                  <Button type="button" onClick={handleNext} className="bg-accent hover:bg-accent-hover text-white font-display flex-[2] py-5">
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={submitState === "loading" || submitState === "success"} className="bg-accent hover:bg-accent-hover text-white font-display flex-[2] py-5 disabled:opacity-70">
                    {submitState === "loading" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                    Submit RFQ
                  </Button>
                )}
                {submitState === "success" && (
                  <Button type="button" variant="outline" onClick={resetForm} className="border-white/15 text-white hover:bg-white/5 font-display flex-1 py-5">
                    New RFQ
                  </Button>
                )}
              </div>
            </form>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                <span className="font-mono-data text-[10px] text-white/40 uppercase tracking-widest">
                  Draft RFQ // {rfqReference}
                </span>
                <span className="font-mono-data text-[9px] text-accent uppercase tracking-widest bg-accent/15 px-2 py-0.5 rounded">
                  {COMPANY.location}
                </span>
              </div>

              <div className="aspect-[16/10] bg-navy-950 rounded-xl border border-white/5 relative overflow-hidden">
                <img src={activeCapability.image} alt={`${activeCapability.name} portfolio reference`} className="h-full w-full object-cover opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-mono-data text-[10px] uppercase tracking-widest text-accent">Selected capability</p>
                  <h3 className="mt-1 font-display text-xl font-bold text-white">{activeCapability.name}</h3>
                  <p className="mt-2 text-xs leading-5 text-white/65">{activeCapability.description}</p>
                </div>
              </div>
            </div>

            <div className="flex-1 mt-6 border-t border-white/5 pt-5 font-mono text-[11px] text-white/70 flex flex-col justify-between">
              <div>
                <h4 className="font-mono-data text-[10px] text-accent uppercase tracking-widest font-bold mb-3">
                  Enquiry Summary
                </h4>
                <ul className="flex flex-col gap-2 bg-black/20 rounded-xl p-4 border border-white/5">
                  <Summary label="Capability" value={activeCapability.name} />
                  <Summary label="Project type" value={projectType} />
                  <Summary label="Material" value={material} />
                  <Summary label="Process" value={process} />
                  <Summary label="Component" value={component || "To be entered"} />
                  <Summary label="Quantity" value={quantity || "To be entered"} />
                  <Summary label="Attachment" value={file?.name || "Optional"} />
                </ul>
              </div>

              <div className="mt-5 border-t border-white/5 pt-4 text-[10px] text-white/40 leading-relaxed">
                * This form does not fake successful submissions. Configure VITE_RFQ_ENDPOINT before accepting real production RFQs.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepIntro({ title, text }: { title: string; text: string }) {
  return (
    <div className="sm:col-span-2 mb-2">
      <h3 className="font-display font-semibold text-lg text-white">{title}</h3>
      <p className="text-xs text-white/50 mt-1">{text}</p>
    </div>
  );
}

function Choice({ checked, label, onClick }: { checked: boolean; label: string; onClick: () => void }) {
  return (
    <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
      checked ? "bg-accent/15 border-accent text-white" : "border-white/5 bg-white/[0.02] hover:bg-white/5 text-white/70"
    }`}>
      <input type="radio" checked={checked} onChange={onClick} className="sr-only" />
      <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center ${checked ? "border-accent bg-accent" : "border-white/30"}`}>
        {checked && <Check className="h-3 w-3 text-white" />}
      </div>
      <span className="font-display text-sm font-semibold">{label}</span>
    </label>
  );
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-mono-data text-white/60 mb-2 uppercase tracking-wider">{label}</label>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-lg border border-white/10 bg-navy-950 px-4 py-3 text-xs text-white focus:outline-none focus:border-accent">
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </div>
  );
}

function Input({ label, value, onChange, placeholder, type = "text", required = false }: { label: string; value: string; onChange: (value: string) => void; placeholder: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-mono-data text-white/60 mb-2 uppercase tracking-wider">
        {label}{required ? " *" : ""}
      </label>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} required={required} className="w-full rounded-lg border border-white/10 bg-navy-950 px-4 py-3 text-xs text-white focus:outline-none focus:border-accent" placeholder={placeholder} />
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex justify-between gap-4 border-b border-white/5 pb-1.5 last:border-0 last:pb-0">
      <span className="text-white/40 uppercase">{label}</span>
      <span className="text-white font-bold text-right">{value}</span>
    </li>
  );
}
