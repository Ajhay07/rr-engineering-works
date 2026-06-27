import {
  Fuel,
  FlaskConical,
  Droplets,
  Zap,
  Anchor,
  Pill,
  UtensilsCrossed,
  Factory,
} from "lucide-react";

export interface Industry {
  id: string;
  name: string;
  icon: typeof Fuel;
  description: string;
}

export const INDUSTRIES: Industry[] = [
  {
    id: "oil-gas",
    name: "Oil & Gas",
    icon: Fuel,
    description: "Upstream, midstream and downstream valves rated for sour and high-pressure service.",
  },
  {
    id: "petrochemical",
    name: "Petrochemical",
    icon: Factory,
    description: "Corrosion-resistant valves engineered for aggressive process chemistries.",
  },
  {
    id: "chemical",
    name: "Chemical",
    icon: FlaskConical,
    description: "Lined and alloy valve solutions for reactive and high-purity chemical lines.",
  },
  {
    id: "water-treatment",
    name: "Water Treatment",
    icon: Droplets,
    description: "Durable isolation and control valves for municipal and industrial water systems.",
  },
  {
    id: "power",
    name: "Power Plants",
    icon: Zap,
    description: "High-temperature, high-pressure valves for boiler, turbine and feedwater systems.",
  },
  {
    id: "marine",
    name: "Marine",
    icon: Anchor,
    description: "Class-approved valves built to withstand marine and offshore operating conditions.",
  },
  {
    id: "pharmaceutical",
    name: "Pharmaceutical",
    icon: Pill,
    description: "Sanitary-grade valves engineered for contamination-free pharma processing.",
  },
  {
    id: "food-processing",
    name: "Food Processing",
    icon: UtensilsCrossed,
    description: "Food-grade, easy-to-clean valve designs compliant with hygienic processing standards.",
  },
];

export interface Certification {
  id: string;
  name: string;
  fullName: string;
  description: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    id: "iso9001",
    name: "ISO 9001:2015",
    fullName: "Quality Management System",
    description: "Certified quality management across design, manufacturing and testing operations.",
  },
  {
    id: "api6d",
    name: "API 6D",
    fullName: "Pipeline Valve Specification",
    description: "Compliant design and manufacturing of pipeline valves for API-specified service.",
  },
  {
    id: "ped",
    name: "PED 2014/68/EU",
    fullName: "Pressure Equipment Directive",
    description: "European conformity for pressure-retaining equipment exported to EU markets.",
  },
  {
    id: "ce",
    name: "CE Marking",
    fullName: "European Conformity",
    description: "Verified compliance with EU health, safety and environmental protection standards.",
  },
];

export const TESTING_STANDARDS = [
  "Hydrostatic Shell Test - API 598",
  "Seat Leakage Test - API 598 / ISO 5208",
  "Fire-Safe Design Test - API 607",
  "Cryogenic Testing - BS 6364",
  "NDT - Radiography & Dye Penetrant",
  "Material Traceability - EN 10204 3.1",
];

export interface QualityStep {
  step: number;
  title: string;
  description: string;
}

export const QUALITY_PROCESS: QualityStep[] = [
  { step: 1, title: "Raw Material Inspection", description: "Incoming castings and forgings verified against mill certificates and chemical composition." },
  { step: 2, title: "In-Process Inspection", description: "Dimensional and visual checks at every CNC and machining stage." },
  { step: 3, title: "Hydrostatic Testing", description: "Shell and seat testing performed on 100% of valves per API 598 standards." },
  { step: 4, title: "NDT & Documentation", description: "Radiography, dye penetrant testing and full material traceability records." },
  { step: 5, title: "Final Inspection & Dispatch", description: "Third-party inspection coordination and export-grade packing prior to dispatch." },
];

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Suresh Kumarasamy",
    role: "Procurement Head",
    company: "Vellore Petrochem Engineering Pvt. Ltd.",
    quote:
      "RR Engineering Works has been a dependable valve supplier for our refinery turnaround projects. Their documentation and lead times consistently meet our EPC schedules.",
  },
  {
    id: "t2",
    name: "Imran Sheikh",
    role: "Mechanical Design Lead",
    company: "Tristar Process Equipments LLC",
    quote:
      "We've sourced gate and ball valves from RR for three consecutive export orders. Material certs and third-party inspection reports have always been in order.",
  },
  {
    id: "t3",
    name: "Lakshmi Narayanan",
    role: "Plant Maintenance Manager",
    company: "Coromandel Water Utilities",
    quote:
      "Their butterfly valves have held up well under continuous municipal water service. After-sales support has been responsive whenever we needed spares.",
  },
  {
    id: "t4",
    name: "Carlos Mendes",
    role: "International Buyer",
    company: "Mendes Industrial Supply, Rotterdam",
    quote:
      "Clear technical communication and CE-compliant documentation made customs clearance straightforward for our European import. Quality matched the datasheets.",
  },
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    question: "What materials are available for your industrial valves?",
    answer:
      "We manufacture valves in cast steel (WCB/WCC), stainless steel (SS304/SS316), duplex and super-duplex alloys, ductile iron, bronze and Monel, depending on the application and process media.",
  },
  {
    question: "Do you provide custom-engineered valve solutions?",
    answer:
      "Yes. Our engineering team works directly with procurement and design teams to develop custom trim, end connections, and actuation configurations for non-standard applications.",
  },
  {
    question: "What is your typical quotation turnaround time?",
    answer:
      "Standard product RFQs are typically quoted within 24-48 working hours. Custom-engineered valve requests may take 3-5 working days depending on technical complexity.",
  },
  {
    question: "Are your valves suitable for export markets?",
    answer:
      "Yes. Our valves are manufactured to API, ASME, ISO and EN standards and are routinely exported with CE marking, PED compliance, and third-party inspection certificates (TPI) as required.",
  },
  {
    question: "What pressure and temperature ranges do you manufacture for?",
    answer:
      "Our valve range covers PN10 through PN420 pressure classes and service temperatures from cryogenic (-196deg C) to high-temperature steam and process applications (up to 425deg C), depending on valve type and trim.",
  },
  {
    question: "Do you offer third-party inspection during manufacturing?",
    answer:
      "Yes, we coordinate with recognized third-party inspection agencies including TUV, SGS, Bureau Veritas and Lloyd's Register for witnessed testing as specified in customer purchase orders.",
  },
  {
    question: "What is the minimum order quantity for industrial valves?",
    answer:
      "We accommodate both project-based bulk orders and smaller MRO/spares quantities. There is no strict minimum order quantity; pricing is structured according to order volume and customization.",
  },
  {
    question: "Can you supply valves with specific end connections?",
    answer:
      "We manufacture valves with flanged, butt-weld, socket-weld, and threaded end connections as per ASME B16.5, B16.10, and B16.34 specifications, based on project requirements.",
  },
  {
    question: "How are valves packed for international shipping?",
    answer:
      "Export shipments are packed in seaworthy wooden cases or pallets with desiccant and corrosion-inhibiting wrap, with flange faces protected and clearly labeled per shipping documentation.",
  },
  {
    question: "Do you provide installation and maintenance support after delivery?",
    answer:
      "Our technical team provides installation guidelines, maintenance manuals, and remote troubleshooting support, with on-site service available for select large-volume projects on request.",
  },
];

export interface Resource {
  id: string;
  title: string;
  description: string;
  fileType: string;
  fileSize: string;
}

export const RESOURCES: Resource[] = [
  {
    id: "catalogue",
    title: "Product Catalogue 2026",
    description: "Complete specification catalogue covering all valve categories and size ranges.",
    fileType: "PDF",
    fileSize: "8.4 MB",
  },
  {
    id: "datasheets",
    title: "Technical Datasheets",
    description: "Detailed dimensional drawings and performance data for each valve series.",
    fileType: "PDF",
    fileSize: "5.1 MB",
  },
  {
    id: "installation-guide",
    title: "Installation Guide",
    description: "Step-by-step installation procedures and torque specifications.",
    fileType: "PDF",
    fileSize: "2.3 MB",
  },
  {
    id: "selection-guide",
    title: "Valve Selection Guide",
    description: "Decision framework for selecting the right valve type for your application.",
    fileType: "PDF",
    fileSize: "3.7 MB",
  },
  {
    id: "maintenance-manual",
    title: "Maintenance Manual",
    description: "Preventive maintenance schedules and troubleshooting reference.",
    fileType: "PDF",
    fileSize: "4.2 MB",
  },
];

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export const MILESTONES: Milestone[] = [
  { year: "2003", title: "Foundation", description: "RR Engineering Works established in Kanchipuram with a single CNC manufacturing line." },
  { year: "2009", title: "ISO Certification", description: "Achieved ISO 9001 certification, formalizing quality systems across production." },
  { year: "2014", title: "Export Expansion", description: "Began exporting valves to Middle East and Southeast Asian markets." },
  { year: "2018", title: "Facility Expansion", description: "Commissioned a second manufacturing unit with expanded casting and testing capacity." },
  { year: "2022", title: "API 6D Certification", description: "Certified for pipeline valve manufacturing under API 6D specification." },
  { year: "2026", title: "Capacity Scale-Up", description: "Crossed 500+ active clients with manufacturing capacity exceeding 40,000 valves annually." },
];

export interface ClientLogo {
  name: string;
}

export const CLIENT_LOGOS: ClientLogo[] = [
  { name: "Reliance" },
  { name: "IOCL" },
  { name: "ONGC" },
  { name: "L&T" },
  { name: "BHEL" },
  { name: "Tata Projects" },
];

export interface WhyChooseFeature {
  title: string;
  description: string;
}

export const WHY_CHOOSE_FEATURES: WhyChooseFeature[] = [
  { title: "Modern Manufacturing", description: "CNC-machined precision with in-house casting and assembly under one roof." },
  { title: "Fast Delivery", description: "Streamlined production scheduling to meet tight EPC project timelines." },
  { title: "Technical Support", description: "Dedicated engineering team for application sizing and specification queries." },
  { title: "Custom Valve Solutions", description: "Tailored trim, actuation and end connections for non-standard requirements." },
  { title: "Strict Quality Control", description: "Multi-stage inspection and 100% hydrostatic testing on every valve produced." },
  { title: "Competitive Pricing", description: "Vertically integrated manufacturing keeps costs efficient without compromising quality." },
  { title: "Export Ready", description: "CE, PED-compliant documentation and seaworthy packing for global shipments." },
  { title: "After Sales Support", description: "Spares availability and maintenance guidance throughout the valve lifecycle." },
];

export interface ManufacturingStage {
  id: string;
  title: string;
  description: string;
  image: string;
}

export const MANUFACTURING_STAGES: ManufacturingStage[] = [
  {
    id: "cnc",
    title: "CNC Machining",
    description: "Multi-axis CNC centers deliver tight dimensional tolerances on valve bodies, seats and stems for consistent fit and sealing performance.",
    image: "https://images.unsplash.com/photo-1565089866787-2895be0541a1?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "casting",
    title: "Casting",
    description: "In-house casting of carbon steel, stainless steel and alloy components ensures full traceability from raw material to finished part.",
    image: "https://images.unsplash.com/photo-1565514020179-026b92b2d70b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "testing",
    title: "Testing",
    description: "Every valve undergoes hydrostatic shell and seat testing per API 598 before it proceeds to final assembly and inspection.",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "assembly",
    title: "Assembly",
    description: "Trained technicians assemble trims and actuators in controlled conditions, following documented torque and lubrication procedures.",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "inspection",
    title: "Quality Inspection",
    description: "Dimensional verification, NDT and documentation review are performed by an independent QA team ahead of dispatch clearance.",
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "packing",
    title: "Packing",
    description: "Flange faces are protected and valves are packed with corrosion inhibitors suited for both domestic transit and ocean freight.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "shipping",
    title: "Shipping",
    description: "Coordinated logistics with documentation support for domestic dispatch and international export consignments.",
    image: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=900&q=80",
  },
];

export const PRODUCTION_STATS = [
  { value: "Project", label: "Batch and MRO Supply" },
  { value: "12", label: "CNC Machining Centers" },
  { value: "On request", label: "Delivery Schedule Planning" },
  { value: "Domestic + Export", label: "Packing Support" },
];
