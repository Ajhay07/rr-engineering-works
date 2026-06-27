import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Send, Phone, ArrowLeft, ArrowRight, BadgeCheck } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { Button } from "@/components/ui/button";

const MATERIALS = [
  { id: "wcb", name: "Cast Carbon Steel (ASTM A216 WCB)", code: "WCB" },
  { id: "cf8m", name: "Stainless Steel 316 (ASTM A182 F316 / CF8M)", code: "SS316" },
  { id: "duplex", name: "Duplex Stainless Steel (ASTM A890 4A)", code: "DSS" },
  { id: "lcc", name: "Low-Temp Carbon Steel (ASTM A352 LCC)", code: "LCC" },
  { id: "alloy", name: "Monel / Hastelloy C276 / Nickel Alloys", code: "ALLOY" },
];

const SIZES = [
  { id: "dn15", name: "DN15 (1/2\")", code: "DN15" },
  { id: "dn50", name: "DN50 (2\")", code: "DN50" },
  { id: "dn100", name: "DN100 (4\")", code: "DN100" },
  { id: "dn150", name: "DN150 (6\")", code: "DN150" },
  { id: "dn300", name: "DN300 (12\")", code: "DN300" },
  { id: "dn600", name: "DN600 (24\")", code: "DN600" },
  { id: "dn1200", name: "DN1200 (48\")", code: "DN1200" },
];

const PRESSURES = [
  { id: "pn16", name: "PN16 (Class 150)", code: "PN16" },
  { id: "pn40", name: "PN40 (Class 300)", code: "PN40" },
  { id: "pn100", name: "PN100 (Class 600)", code: "PN100" },
  { id: "pn160", name: "PN160 (Class 900)", code: "PN160" },
  { id: "pn250", name: "PN250 (Class 1500)", code: "PN250" },
  { id: "pn420", name: "PN420 (Class 2500)", code: "PN420" },
];

const CONNECTIONS = [
  { id: "rf", name: "Raised Face Flanged (RF)", code: "RF" },
  { id: "rtj", name: "Ring Type Joint Flanged (RTJ)", code: "RTJ" },
  { id: "bw", name: "Butt-Weld Ends (BW)", code: "BW" },
  { id: "sw", name: "Socket-Weld Ends (SW)", code: "SW" },
  { id: "npt", name: "Threaded Ends (NPT)", code: "NPT" },
];

interface ValveConfiguratorProps {
  selectedValveId: string;
  setSelectedValveId: (id: string) => void;
}

export function ValveConfigurator({ selectedValveId, setSelectedValveId }: ValveConfiguratorProps) {
  const [step, setStep] = useState(1);
  const [valveType, setValveType] = useState(PRODUCTS[0].id);
  const [material, setMaterial] = useState(MATERIALS[0].id);
  const [size, setSize] = useState(SIZES[2].id);
  const [pressure, setPressure] = useState(PRESSURES[0].id);
  const [connection, setConnection] = useState(CONNECTIONS[0].id);
  const [quantity, setQuantity] = useState("10");
  
  // Contact details
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [project, setProject] = useState("");
  
  const [submitted, setSubmitted] = useState(false);
  const [rfqCode, setRfqCode] = useState("");

  // Sync state if selected from Product showcase
  useEffect(() => {
    if (selectedValveId) {
      setValveType(selectedValveId);
      // Auto jump to step 2 if they select from showcase
      setStep(2);
    }
  }, [selectedValveId]);

  const activeValve = PRODUCTS.find((p) => p.id === valveType) || PRODUCTS[0];
  const activeMaterial = MATERIALS.find((m) => m.id === material) || MATERIALS[0];
  const activeSize = SIZES.find((s) => s.id === size) || SIZES[2];
  const activePressure = PRESSURES.find((p) => p.id === pressure) || PRESSURES[0];
  const activeConnection = CONNECTIONS.find((c) => c.id === connection) || CONNECTIONS[0];

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

  const generateRfqCode = () => {
    const vCode = activeValve.id.slice(0, 3).toUpperCase();
    const mCode = activeMaterial.code;
    const sCode = activeSize.code;
    const pCode = activePressure.code;
    const cCode = activeConnection.code;
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `RFQ-RR-${vCode}-${mCode}-${sCode}-${pCode}-${cCode}-${rand}`;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = generateRfqCode();
    setRfqCode(code);
    setSubmitted(true);
  };

  const triggerWhatsAppSubmit = () => {
    const text = `*NEW RFQ INQUIRY FROM WEBSITE*
*RFQ Code:* ${rfqCode}
*Client:* ${name} (${company})
*Email:* ${email}
*Phone:* ${phone}
*Project:* ${project || "N/A"}

*CONFIGURED VALVE SPECIFICATIONS:*
• *Valve Type:* ${activeValve.name}
• *Material:* ${activeMaterial.name}
• *Size:* ${activeSize.name}
• *Pressure Rating:* ${activePressure.name}
• *End Connection:* ${activeConnection.name}
• *Quantity:* ${quantity} units

Please check and send a quotation.`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/919841027563?text=${encodedText}`, "_blank");
  };

  const resetConfigurator = () => {
    setStep(1);
    setSubmitted(false);
    setSelectedValveId("");
    setName("");
    setCompany("");
    setEmail("");
    setPhone("");
    setProject("");
  };

  return (
    <section id="configurator" className="bg-navy-950 text-white py-24 sm:py-32 relative overflow-hidden">
      {/* Blueprint Grid Backdrop */}
      <div className="absolute inset-0 bg-blueprint-dark opacity-10 pointer-events-none" />
      <div className="absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 font-mono-data text-xs font-medium uppercase tracking-[0.18em] mb-4 text-accent">
            <span className="h-px w-6 bg-accent" />
            Interactive Procurement
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.15] text-white">
            Custom Valve RFQ Configurator
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/60 leading-relaxed">
            Select your parameters, generate an instant technical procurement datasheet, and submit it directly to our sales team for pricing.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-stretch">
          {/* Left Panel: Step-by-Step Configurator */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-8 flex flex-col justify-between min-h-[550px]">
            {submitted ? (
              // Submission Success State
              <div className="flex flex-col items-center justify-center text-center py-12 flex-1">
                <div className="h-16 w-16 bg-accent/20 rounded-full flex items-center justify-center text-accent mb-6 animate-pulse">
                  <BadgeCheck className="h-10 w-10 animate-bounce" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">
                  RFQ Generated Successfully
                </h3>
                <p className="text-white/60 text-sm max-w-md leading-relaxed mb-6">
                  Your customized engineering specification datasheet has been registered.
                </p>

                {/* RFQ Code Box */}
                <div className="bg-black/30 border border-white/10 rounded-xl p-4 font-mono text-center w-full max-w-sm mb-8">
                  <span className="text-[10px] text-white/40 block mb-1">REFERENCE RFQ CODE</span>
                  <span className="text-accent font-bold tracking-wider text-base">{rfqCode}</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                  <Button onClick={triggerWhatsAppSubmit} className="bg-green-600 hover:bg-green-700 text-white font-display flex-1 gap-2.5 py-6">
                    <Phone className="h-5 w-5" />
                    Submit via WhatsApp
                  </Button>
                  <Button variant="outline" onClick={resetConfigurator} className="border-white/20 text-white hover:bg-white hover:text-navy font-display flex-1 py-6">
                    Configure Another
                  </Button>
                </div>
              </div>
            ) : (
              // Multi-step Form State
              <form onSubmit={handleFormSubmit} className="flex flex-col justify-between flex-1">
                {/* Step indicator */}
                <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                  <span className="font-mono-data text-[10px] uppercase tracking-wider text-white/50">
                    STEP {step} OF 3
                  </span>
                  <div className="flex gap-1.5">
                    {[1, 2, 3].map((s) => (
                      <span
                        key={s}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          s === step ? "w-6 bg-accent" : "w-2 bg-white/15"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-1 mb-8">
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid sm:grid-cols-2 gap-4"
                    >
                      <div className="sm:col-span-2 mb-2">
                        <h3 className="font-display font-semibold text-lg text-white">
                          Select Valve Category
                        </h3>
                        <p className="text-xs text-white/50 mt-1">
                          Choose the valve design required for your application.
                        </p>
                      </div>
                      {PRODUCTS.map((p) => (
                        <label
                          key={p.id}
                          className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                            valveType === p.id
                              ? "bg-accent/15 border-accent text-white"
                              : "border-white/5 bg-white/[0.02] hover:bg-white/5 text-white/70"
                          }`}
                        >
                          <input
                            type="radio"
                            name="valveType"
                            value={p.id}
                            checked={valveType === p.id}
                            onChange={() => setValveType(p.id)}
                            className="sr-only"
                          />
                          <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center ${
                            valveType === p.id ? "border-accent bg-accent" : "border-white/30"
                          }`}>
                            {valveType === p.id && <Check className="h-3 w-3 text-white" />}
                          </div>
                          <span className="font-display text-sm font-semibold">{p.name}</span>
                        </label>
                      ))}
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid sm:grid-cols-2 gap-5"
                    >
                      <div className="sm:col-span-2">
                        <h3 className="font-display font-semibold text-lg text-white">
                          Configure Metallurgy &amp; Dimensions
                        </h3>
                        <p className="text-xs text-white/50 mt-1">
                          Specify sizing, pressure ratings, material, and end connections.
                        </p>
                      </div>

                      {/* Metallurgy */}
                      <div>
                        <label className="block text-xs font-mono-data text-white/60 mb-2 uppercase tracking-wider">
                          Body Metallurgy
                        </label>
                        <select
                          value={material}
                          onChange={(e) => setMaterial(e.target.value)}
                          className="w-full rounded-lg border border-white/10 bg-navy-950 px-4 py-3 text-xs text-white focus:outline-none focus:border-accent"
                        >
                          {MATERIALS.map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Size */}
                      <div>
                        <label className="block text-xs font-mono-data text-white/60 mb-2 uppercase tracking-wider">
                          Nominal Size
                        </label>
                        <select
                          value={size}
                          onChange={(e) => setSize(e.target.value)}
                          className="w-full rounded-lg border border-white/10 bg-navy-950 px-4 py-3 text-xs text-white focus:outline-none focus:border-accent"
                        >
                          {SIZES.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Pressure Rating */}
                      <div>
                        <label className="block text-xs font-mono-data text-white/60 mb-2 uppercase tracking-wider">
                          Pressure Rating / Class
                        </label>
                        <select
                          value={pressure}
                          onChange={(e) => setPressure(e.target.value)}
                          className="w-full rounded-lg border border-white/10 bg-navy-950 px-4 py-3 text-xs text-white focus:outline-none focus:border-accent"
                        >
                          {PRESSURES.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* End Connection */}
                      <div>
                        <label className="block text-xs font-mono-data text-white/60 mb-2 uppercase tracking-wider">
                          End Connection Type
                        </label>
                        <select
                          value={connection}
                          onChange={(e) => setConnection(e.target.value)}
                          className="w-full rounded-lg border border-white/10 bg-navy-950 px-4 py-3 text-xs text-white focus:outline-none focus:border-accent"
                        >
                          {CONNECTIONS.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Quantity */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-mono-data text-white/60 mb-2 uppercase tracking-wider">
                          Quantity Required
                        </label>
                        <input
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          className="w-full rounded-lg border border-white/10 bg-navy-950 px-4 py-3 text-xs text-white focus:outline-none focus:border-accent"
                          placeholder="Enter quantity"
                          min="1"
                          required
                        />
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid sm:grid-cols-2 gap-5"
                    >
                      <div className="sm:col-span-2">
                        <h3 className="font-display font-semibold text-lg text-white">
                          Business Contact Details
                        </h3>
                        <p className="text-xs text-white/50 mt-1">
                          Provide your contact details so our engineering sales team can respond.
                        </p>
                      </div>

                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-mono-data text-white/60 mb-2 uppercase tracking-wider">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full rounded-lg border border-white/10 bg-navy-950 px-4 py-3 text-xs text-white focus:outline-none focus:border-accent"
                          placeholder="Your name"
                          required
                        />
                      </div>

                      {/* Company Name */}
                      <div>
                        <label className="block text-xs font-mono-data text-white/60 mb-2 uppercase tracking-wider">
                          Company Name *
                        </label>
                        <input
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="w-full rounded-lg border border-white/10 bg-navy-950 px-4 py-3 text-xs text-white focus:outline-none focus:border-accent"
                          placeholder="Company name"
                          required
                        />
                      </div>

                      {/* Business Email */}
                      <div>
                        <label className="block text-xs font-mono-data text-white/60 mb-2 uppercase tracking-wider">
                          Business Email *
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full rounded-lg border border-white/10 bg-navy-950 px-4 py-3 text-xs text-white focus:outline-none focus:border-accent"
                          placeholder="you@company.com"
                          required
                        />
                      </div>

                      {/* Phone / WhatsApp */}
                      <div>
                        <label className="block text-xs font-mono-data text-white/60 mb-2 uppercase tracking-wider">
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full rounded-lg border border-white/10 bg-navy-950 px-4 py-3 text-xs text-white focus:outline-none focus:border-accent"
                          placeholder="+91 00000 00000"
                          required
                        />
                      </div>

                      {/* Project description */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-mono-data text-white/60 mb-2 uppercase tracking-wider">
                          Project Description / Technical Notes
                        </label>
                        <textarea
                          rows={3}
                          value={project}
                          onChange={(e) => setProject(e.target.value)}
                          className="w-full rounded-lg border border-white/10 bg-navy-950 px-4 py-3 text-xs text-white focus:outline-none focus:border-accent resize-none"
                          placeholder="e.g. Sour gas application, high-temperature fluid, TPI required..."
                        />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Form Controls */}
                <div className="flex gap-4 border-t border-white/5 pt-6 mt-4">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePrev}
                      className="border-white/15 text-white hover:bg-white/5 font-display flex-1 py-5"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                  )}
                  {step < 3 ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="bg-accent hover:bg-accent-hover text-white font-display flex-[2] py-5"
                    >
                      Continue <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="bg-accent hover:bg-accent-hover text-white font-display flex-[2] py-5"
                    >
                      <Send className="mr-2 h-4 w-4 animate-pulse" /> Submit RFQ Sheet
                    </Button>
                  )}
                </div>
              </form>
            )}
          </div>

          {/* Right Panel: CAD Preview & Datasheet (Tactile display) */}
          <div className="rounded-2xl border border-white/10 bg-black/40 p-6 flex flex-col justify-between">
            {/* Real-time Generated Datasheet */}
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                <span className="font-mono-data text-[10px] text-white/40 uppercase tracking-widest">
                  Live Drawing Preview // FIG. {valveType.replace("-", "_").toUpperCase()}
                </span>
                <span className="font-mono-data text-[9px] text-accent uppercase tracking-widest bg-accent/15 px-2 py-0.5 rounded">
                  {activeSize.code} / {activePressure.code}
                </span>
              </div>

              {/* Dynamic SVG CAD Blueprint box */}
              <div className="aspect-[16/10] bg-navy-950 rounded-xl border border-white/5 relative flex items-center justify-center p-4 overflow-hidden">
                {/* Blueprint grid layout */}
                <div className="absolute inset-0 bg-blueprint-dark opacity-10 pointer-events-none" />

                <div className="absolute top-2 left-2 text-[8px] font-mono-data text-white/30 uppercase">
                  DIMENSIONS: MM // DRAWING NO: RR-{valveType.toUpperCase()}
                </div>

                {/* SVG Renderings dynamically switching by Type */}
                {valveType === "gate-valve" && (
                  <svg className="w-[60%] h-[90%] text-accent/50 stroke-current fill-none stroke-[1.5]" viewBox="0 0 100 120">
                    <line x1="50" y1="5" x2="50" y2="115" strokeDasharray="2,2" className="stroke-white/10" />
                    <ellipse cx="50" cy="15" rx="20" ry="4" className="stroke-white/60" />
                    <rect x="47" y="15" width="6" height="40" className="stroke-white/40" />
                    <path d="M40" />
                    <path d="M30,55 L50,25 L70,55" className="stroke-white/30" />
                    <rect x="35" y="55" width="30" height="8" rx="1" className="stroke-white/60" />
                    <path d="M42,63 L42,90 M58,63 L58,90" className="stroke-white/40" />
                    <path d="M30,90 L70,90 L75,115 L25,115 Z" className="stroke-accent" />
                    <rect x="15" y="100" width="10" height="15" className="stroke-white/70" />
                    <rect x="75" y="100" width="10" height="15" className="stroke-white/70" />
                    <polygon points="43,98 57,98 54,112 46,112" className="stroke-accent fill-accent/15" />
                  </svg>
                )}

                {valveType === "ball-valve" && (
                  <svg className="w-[80%] h-[80%] text-accent/50 stroke-current fill-none stroke-[1.5]" viewBox="0 0 120 100">
                    <line x1="60" y1="5" x2="60" y2="95" strokeDasharray="2,2" className="stroke-white/10" />
                    <rect x="52" y="10" width="16" height="25" rx="1" className="stroke-white/60" />
                    <line x1="30" y1="20" x2="90" y2="20" className="stroke-white/40" strokeWidth="2" />
                    <rect x="35" y="35" width="50" height="50" rx="25" className="stroke-accent" />
                    <circle cx="60" cy="60" r="18" className="stroke-accent fill-accent/15" />
                    <line x1="10" y1="60" x2="35" y2="60" className="stroke-white/60" />
                    <line x1="85" y1="60" x2="110" y2="60" className="stroke-white/60" />
                    <rect x="10" y="45" width="8" height="30" className="stroke-white/80" />
                    <rect x="102" y="45" width="8" height="30" className="stroke-white/80" />
                  </svg>
                )}

                {valveType === "butterfly-valve" && (
                  <svg className="w-[70%] h-[80%] text-accent/50 stroke-current fill-none stroke-[1.5]" viewBox="0 0 100 100">
                    <line x1="50" y1="5" x2="50" y2="95" strokeDasharray="2,2" className="stroke-white/10" />
                    <rect x="46" y="8" width="8" height="84" rx="2" className="stroke-white/60" />
                    <circle cx="50" cy="50" r="36" className="stroke-accent" />
                    <line x1="14" y1="50" x2="86" y2="50" className="stroke-white/20" />
                    {/* Disc rotation visual */}
                    <ellipse cx="50" cy="50" rx="36" ry="8" className="stroke-accent fill-accent/15" transform="rotate(-30 50 50)" />
                    {/* Flange links */}
                    <line x1="35" y1="12" x2="35" y2="88" strokeDasharray="2,2" className="stroke-white/30" />
                    <line x1="65" y1="12" x2="65" y2="88" strokeDasharray="2,2" className="stroke-white/30" />
                  </svg>
                )}

                {valveType === "globe-valve" && (
                  <svg className="w-[70%] h-[90%] text-accent/50 stroke-current fill-none stroke-[1.5]" viewBox="0 0 100 120">
                    <line x1="50" y1="5" x2="50" y2="115" strokeDasharray="2,2" className="stroke-white/10" />
                    <ellipse cx="50" cy="15" rx="22" ry="4" className="stroke-white/60" />
                    <rect x="47" y="15" width="6" height="40" className="stroke-white/40" />
                    <rect x="30" y="55" width="40" height="15" rx="2" className="stroke-white/50" />
                    {/* Globe structure */}
                    <path d="M25,85 L35,85 L35,115 L25,115 Z" className="stroke-white/70" />
                    <path d="M75,85 L65,85 L65,115 L75,115 Z" className="stroke-white/70" />
                    <path d="M35,100 C35,75 65,75 65,100 Z" className="stroke-accent" />
                    <line x1="35" y1="100" x2="65" y2="100" className="stroke-accent stroke-[1.5]" />
                    <circle cx="50" cy="92" r="5" className="stroke-accent fill-accent/15" />
                  </svg>
                )}

                {!["gate-valve", "ball-valve", "butterfly-valve", "globe-valve"].includes(valveType) && (
                  <svg className="w-[70%] h-[80%] text-accent/50 stroke-current fill-none stroke-[1.5]" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" className="stroke-accent" strokeDasharray="3,3" />
                    <rect x="30" y="30" width="40" height="40" rx="5" className="stroke-white/40" />
                    <line x1="10" y1="50" x2="90" y2="50" className="stroke-white/60" />
                    <line x1="50" y1="10" x2="50" y2="90" className="stroke-white/60" />
                  </svg>
                )}
              </div>
            </div>

            {/* Generated Datasheet Content */}
            <div className="flex-1 mt-6 border-t border-white/5 pt-5 font-mono text-[11px] text-white/70 flex flex-col justify-between">
              <div>
                <h4 className="font-mono-data text-[10px] text-accent uppercase tracking-widest font-bold mb-3">
                  Technical Spec Sheet
                </h4>
                <ul className="flex flex-col gap-2 bg-black/20 rounded-xl p-4 border border-white/5">
                  <li className="flex justify-between border-b border-white/5 pb-1.5 last:border-0 last:pb-0">
                    <span className="text-white/40">1. VALVE CATEGORY</span>
                    <span className="text-white font-bold">{activeValve.name}</span>
                  </li>
                  <li className="flex justify-between border-b border-white/5 pb-1.5 last:border-0 last:pb-0">
                    <span className="text-white/40">2. NOMINAL DIAMETER</span>
                    <span className="text-white font-bold">{activeSize.name}</span>
                  </li>
                  <li className="flex justify-between border-b border-white/5 pb-1.5 last:border-0 last:pb-0">
                    <span className="text-white/40">3. PRESSURE RATING</span>
                    <span className="text-white font-bold">{activePressure.name}</span>
                  </li>
                  <li className="flex justify-between border-b border-white/5 pb-1.5 last:border-0 last:pb-0">
                    <span className="text-white/40">4. MATERIAL GRADE</span>
                    <span className="text-white font-bold">{activeMaterial.code}</span>
                  </li>
                  <li className="flex justify-between border-b border-white/5 pb-1.5 last:border-0 last:pb-0">
                    <span className="text-white/40">5. END CONNECTION</span>
                    <span className="text-white font-bold">{activeConnection.code}</span>
                  </li>
                  <li className="flex justify-between border-b border-white/5 pb-1.5 last:border-0 last:pb-0">
                    <span className="text-white/40">6. ESTIMATED QUANTITY</span>
                    <span className="text-white font-bold">{quantity} PCS</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-white/40">7. COMPLIANCE STANDARD</span>
                    <span className="text-white font-bold">ASME B16.34 / API 6D</span>
                  </li>
                </ul>
              </div>

              {/* Security info stamp */}
              <div className="mt-5 border-t border-white/5 pt-4 text-[10px] text-white/40 leading-relaxed">
                * This configured specification is subject to mechanical verification by our engineers. Official datasheets and 2D general assembly (GA) drawings will be supplied on quotation request approval.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
