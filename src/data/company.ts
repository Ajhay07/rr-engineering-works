import {
  Anchor,
  Atom,
  Cog,
  Factory,
  Flame,
  FlaskConical,
  Gauge,
  Hammer,
  HardHat,
  Microscope,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";

export const COMPANY = {
  name: "Raghav Engineering",
  shortName: "Raghav Engineering",
  alternateName: "R Engineering",
  tagline: "Overlay Cladding, Specialised Welding & Precision Machining",
  location: "Alapakkam, Chennai",
  foundedDisplay: "Since 2003",
  phone: "",
  phoneAlt: "",
  email: "",
  exportEmail: "",
  hours: {
    weekdays: "Business hours to be confirmed",
    sunday: "To be confirmed",
  },
  address: {
    line1: "Factory location in Alapakkam",
    line2: "Chennai",
    city: "Tamil Nadu",
    pincode: "",
    country: "India",
  },
  mapEmbedQuery: "Alapakkam, Chennai, Tamil Nadu",
  social: {
    linkedin: "#",
    youtube: "#",
    twitter: "#",
    facebook: "#",
  },
  confirmationNeeded: [
    "Legal display name: PDF cover says Raghav Engineering; inner copy also uses R Engineering.",
    "Establishment year: PDF cover says Since 2003; company paragraph says since 1995.",
    "Phone number, sales email, full postal address and business hours are not visible in the supplied PDF.",
    "Certification document number and certificate scope should be confirmed before publishing beyond ISO 9001:2015 wording.",
  ],
};

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Capabilities", href: "#products" },
  { label: "RFQ", href: "#configurator" },
  { label: "Facilities", href: "#manufacturing" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Quality", href: "#quality" },
  { label: "Applications", href: "#industries" },
  { label: "Resources", href: "#resources" },
  { label: "Contact", href: "#contact" },
];

export const HERO_METRICS = [
  { value: "ISO", label: "9001:2015 Certified Organization" },
  { value: "9", suffix: "+", label: "Welding Process Families" },
  { value: "CNC", label: "Precision Machining Capability" },
  { value: "RT", label: "Radiographic-Quality Welding" },
];

export const CAPABILITIES = [
  {
    id: "overlay-cladding",
    name: "Nickel Based Overlay Cladding",
    slug: "overlay-cladding",
    image: "/company-profile/pdf-page-04-image-08.jpg",
    description:
      "Overlay cladding for internal and external components, including valve bodies, full bore cladded components, body areas and spool joint requirements.",
    applications: ["Valve components", "Body + spool joints", "Oil & energy", "Petrochemical"],
    material: "Nickel based alloys / Monel / duplex / super duplex",
    process: "SAW / AUTO-TIG / AUTO-MIG / PTAW",
    sizeRange: "Project-specific; PDF portfolio references 2 in to 54 in work",
  },
  {
    id: "hard-facing",
    name: "Cobalt Based Hard Facing",
    slug: "hard-facing",
    image: "/company-profile/pdf-page-05-image-01.jpg",
    description:
      "Hard-facing and coating work using cobalt alloys for plug valves, gate valves and components exposed to wear or demanding service conditions.",
    applications: ["Plug valves", "Gate valves", "Seat/contact areas", "Wear surfaces"],
    material: "Stellite Gr-6 / Stellite Gr-21 / Colmonoy grades",
    process: "PTAW / AUTO-TIG / manual and automated welding",
    sizeRange: "Project-specific; PDF portfolio references up to 48 in hard surfacing work",
  },
  {
    id: "special-welding",
    name: "Specialised Welding",
    slug: "special-welding",
    image: "/company-profile/pdf-page-05-image-06.jpg",
    description:
      "Special welding for dissimilar grades, in-situ welding, valve assemblies, high pressure components and fabrication requirements.",
    applications: ["Dissimilar grade welding", "Valve assembly welding", "High pressure components", "Fabrication"],
    material: "Low alloy P11/P22/P5/P9/P91, nickel alloys, duplex, super duplex",
    process: "GTAW / SMAW / GMAW / FCAW / SAW / Hot Wire TIG",
    sizeRange: "Project-specific",
  },
  {
    id: "cryogenic-welding",
    name: "Cryogenic Application Welding",
    slug: "cryogenic-welding",
    image: "/company-profile/pdf-page-04-image-06.jpg",
    description:
      "Cryogenic valve welding and joint welding for complex material requirements, supported by production, testing, certification and documentation practices.",
    applications: ["Cryogenic valves", "High pressure cryogenic bonnet valves", "Trunnion mounted ball valves", "Joint welding"],
    material: "Nickel based and special alloys as specified",
    process: "In-situ and joint welding",
    sizeRange: "PDF references 2 in to 54 in cryogenic work",
  },
  {
    id: "precision-machining",
    name: "Precision Machining",
    slug: "precision-machining",
    image: "/company-profile/pdf-page-05-image-12.jpg",
    description:
      "Precision machining capability for welded, cladded and fabricated components using CNC and conventional heavy machining equipment.",
    applications: ["Cladded components", "High pressure valve components", "Fabricated assemblies", "Profile machining"],
    material: "Customer-specified metallic materials",
    process: "CNC turning / VMC / HBM / VTL / centre lathe / radial drilling",
    sizeRange: "Project-specific",
  },
  {
    id: "fabrication",
    name: "Fabrication & Assembly Support",
    slug: "fabrication",
    image: "/company-profile/pdf-page-05-image-11.jpg",
    description:
      "Fabrication of gate and other valve types, body + spool joint welding, bypass welding and assembly welding to customer requirements.",
    applications: ["Gate valve fabrication", "Body + spool joints", "Bypass welding", "Valve assemblies"],
    material: "Dissimilar grades and special materials",
    process: "Fabrication / welding / machining / inspection",
    sizeRange: "Project-specific",
  },
];

export const WELDING_PROCESSES = [
  "GTAW",
  "SMAW",
  "GMAW",
  "FCAW",
  "PTAW",
  "SAW",
  "AUTO-MIG",
  "Hot Wire TIG",
  "Robotic TIG and MIG",
];

export const MACHINING_PROCESSES = [
  "CNC turning lathe",
  "VMC",
  "Horizontal boring machine",
  "Vertical turret lathe",
  "Centre lathe",
  "Planning machine",
  "Radial drilling machine",
];

export const SPECIAL_MATERIALS = [
  "Colmonoy-4",
  "Colmonoy-5",
  "Monel",
  "Stellite Gr-6",
  "Stellite Gr-21",
  "AlBronze",
  "Nickel Albronze",
  "Low alloy P11/P22/P5/P9/P91",
  "Duplex",
  "Super Duplex",
  "Nickel Based Alloys",
];

export const INDUSTRIES = [
  {
    id: "oil-energy",
    name: "Oil & Energy",
    icon: Flame,
    description: "Overlay cladding and special welding for components used in oil and energy applications.",
  },
  {
    id: "petrochemical",
    name: "Petrochemical",
    icon: FlaskConical,
    description: "Welding and cladding support for aggressive-service process components and assemblies.",
  },
  {
    id: "power-generation",
    name: "Power Generation",
    icon: Zap,
    description: "Overlay and welding techniques for power generation projects and power piping requirements.",
  },
  {
    id: "cryogenic",
    name: "Cryogenic Applications",
    icon: Snowflake,
    description: "Cryogenic valve welding, in-situ welding and joint welding for complex material requirements.",
  },
  {
    id: "nuclear",
    name: "Nuclear Areas",
    icon: Atom,
    description: "High quality welding and fabrication products for extensive applications including nuclear areas.",
  },
  {
    id: "valve-components",
    name: "Valve Components",
    icon: Gauge,
    description: "Cladding, coating, welding, machining and fabrication support for gate, globe, ball and slurry valve components.",
  },
  {
    id: "fabrication",
    name: "Fabrication",
    icon: HardHat,
    description: "Fabrication and assembly welding for customer-specified engineering components.",
  },
  {
    id: "metallurgy",
    name: "Metallurgy & Failure Review",
    icon: Microscope,
    description: "Material science review and root-cause oriented analysis referenced in the company profile.",
  },
];

export const QUALITY_PROCESS = [
  {
    step: 1,
    title: "Requirement Review",
    description: "Customer specification, material grade, application and documentation expectations are reviewed before work begins.",
  },
  {
    step: 2,
    title: "Process Selection",
    description: "Welding, cladding, machining and heat treatment routes are selected based on the component and service requirement.",
  },
  {
    step: 3,
    title: "In-Process Control",
    description: "Welding and machining work is monitored by technically skilled welding and quality engineers.",
  },
  {
    step: 4,
    title: "Inspection",
    description: "The profile references CMM inspection and welding to radiographic quality as part of quality management.",
  },
  {
    step: 5,
    title: "Documentation",
    description: "Production, testing, certification and documentation are handled according to customer requirements.",
  },
];

export const TESTING_STANDARDS = [
  "ISO 9001:2015 quality management",
  "CMM inspection",
  "Welding to radiographic quality",
  "Customer specification-based testing",
  "Certification and documentation support",
  "Heat treatment process support",
];

export const MANUFACTURING_STAGES = [
  {
    id: "welding-automation",
    title: "Welding Automation",
    description:
      "Advanced welding automation for effective, efficient operations across overlay cladding and specialised welding jobs.",
    image: "/company-profile/pdf-page-04-image-10.jpg",
  },
  {
    id: "overlay",
    title: "Overlay Cladding",
    description:
      "Nickel based overlay and cobalt based hard facing for internal/external components and process portfolio applications.",
    image: "/company-profile/pdf-page-04-image-08.jpg",
  },
  {
    id: "machining",
    title: "Precision Machining",
    description:
      "CNC profile machining and heavy machining using CNC turning, VMC, HBM, VTL and conventional machines.",
    image: "/company-profile/pdf-page-05-image-12.jpg",
  },
  {
    id: "heat-treatment",
    title: "Heat Treatment",
    description:
      "Heat treatment process support for selected cladding and welding requirements according to customer specification.",
    image: "/company-profile/pdf-page-04-image-03.jpg",
  },
  {
    id: "inspection",
    title: "Quality Inspection",
    description:
      "Quality management supported by CMM inspection, radiographic-quality welding and documentation practices.",
    image: "/company-profile/pdf-page-05-image-13.jpg",
  },
  {
    id: "fabrication",
    title: "Fabrication",
    description:
      "Fabrication, body + spool joint welding, bypass welding and assembly welding for project-specific components.",
    image: "/company-profile/pdf-page-05-image-11.jpg",
  },
];

export const PRODUCTION_STATS = [
  { value: "ISO", label: "9001:2015 Quality System" },
  { value: "PTAW", label: "SAW / AUTO-MIG / Hot Wire TIG" },
  { value: "CNC", label: "VMC / HBM / VTL Machining" },
  { value: "Chennai", label: "Factory Location: Alapakkam" },
];

export const WHY_CHOOSE_FEATURES = [
  {
    title: "Specialised Cladding Focus",
    description: "The profile positions the company around nickel overlay cladding and cobalt based hard facing.",
    icon: Sparkles,
  },
  {
    title: "Advanced Welding Range",
    description: "GTAW, SMAW, GMAW, FCAW, PTAW, SAW, AUTO-MIG, Hot Wire TIG and robotic TIG/MIG capabilities.",
    icon: Flame,
  },
  {
    title: "Precision Machining",
    description: "CNC turning, VMC, horizontal boring, VTL, centre lathe, planning and radial drilling capability.",
    icon: Cog,
  },
  {
    title: "Complex Materials",
    description: "Experience with Colmonoy, Monel, Stellite, AlBronze, low alloy, duplex, super duplex and nickel alloys.",
    icon: Wrench,
  },
  {
    title: "Cryogenic Experience",
    description: "The profile references cryogenic valve welding, in-situ welding and joint welding for complex sizes.",
    icon: Snowflake,
  },
  {
    title: "Quality Managed Work",
    description: "ISO 9001:2015 quality management, CMM inspection and radiographic-quality welding are referenced.",
    icon: ShieldCheck,
  },
  {
    title: "Fabrication Support",
    description: "Fabrication of gate and other valve types, body + spool welding and valve assembly welding.",
    icon: Hammer,
  },
  {
    title: "Chennai Facility",
    description: "Factory location in Alapakkam, Chennai with welding, machining and heat treatment process capability.",
    icon: Factory,
  },
];

export const RESOURCES = [
  {
    id: "company-profile",
    title: "Official Company Profile",
    description: "PDF supplied by the client covering company profile, capabilities, core values and process portfolio.",
    fileType: "PDF",
    fileSize: "4.4 MB",
    href: "/company-profile/raghav-engineering-company-profile.pdf",
  },
  {
    id: "rfq-checklist",
    title: "RFQ Information Checklist",
    description: "A practical checklist of details needed for cladding, welding, machining and fabrication enquiries.",
    fileType: "FORM",
    fileSize: "Online",
    href: "#configurator",
  },
  {
    id: "confirmation-list",
    title: "Client Confirmation Items",
    description: "Details still required before final public launch, including contact details and establishment year.",
    fileType: "NOTE",
    fileSize: "On page",
    href: "#client-confirmation",
  },
];

export const FAQS = [
  {
    question: "What is the company primarily specialised in?",
    answer:
      "The official profile describes Raghav Engineering as specialised in nickel based overlay cladding, cobalt based hard facing, advanced welding, machining and fabrication.",
  },
  {
    question: "Which welding processes are listed in the company profile?",
    answer:
      "The profile lists GTAW, SMAW, GMAW, FCAW, PTAW, SAW, AUTO-MIG, Hot Wire TIG and robotic TIG and MIG welding.",
  },
  {
    question: "Which machining facilities are listed?",
    answer:
      "The profile lists CNC turning lathe, VMC, horizontal boring machine, vertical turret lathe, centre lathe, planning machine and radial drilling machine.",
  },
  {
    question: "Does the company handle cryogenic applications?",
    answer:
      "Yes. The profile states experience in cryogenic valve welding, in-situ welding and joint welding, with portfolio references to high pressure cryogenic bonnet valve work.",
  },
  {
    question: "Which materials are specifically mentioned?",
    answer:
      "The profile mentions Colmonoy-4, Colmonoy-5, Monel, Stellite Gr-6, Stellite Gr-21, AlBronze, Nickel Albronze, low alloy materials P11/P22/P5/P9/P91, duplex, super duplex and nickel based alloys.",
  },
  {
    question: "Is the company ISO certified?",
    answer:
      "The supplied profile states that Raghav Engineering is an ISO 9001:2015 certified organization. Certificate number and current certificate copy should be confirmed before publishing formal certification details.",
  },
  {
    question: "What information is still required from the client?",
    answer:
      "The website still needs confirmed phone number, email, full postal address, business hours, legal company name and the correct establishment year because the PDF shows conflicting dates.",
  },
];

export const MILESTONES = [
  {
    year: "2003 / 1995",
    title: "Establishment date needs confirmation",
    description: "The PDF cover says Since 2003, while the company paragraph says the business has provided services since 1995.",
  },
  {
    year: "Profile",
    title: "Specialised welding and machining",
    description: "The official profile positions the business around overlay cladding, hard facing, welding automation and precision machining.",
  },
  {
    year: "Present",
    title: "Alapakkam, Chennai facility",
    description: "The PDF lists the factory location in Alapakkam, Chennai with CNC, VMC, VTL, HBM, manipulators and heat treatment processes.",
  },
];

export const PROCESS_PORTFOLIO = [
  {
    id: "stellite-gate-valves",
    title: "Stellite-6 Coating on Gate Valves",
    category: "Hard Facing",
    image: "/company-profile/pdf-page-05-image-01.jpg",
  },
  {
    id: "full-bore-cladded",
    title: "Full Bore Cladded Component, Length 1000 mm with ID 200 mm",
    category: "Overlay Cladding",
    image: "/company-profile/pdf-page-04-image-08.jpg",
  },
  {
    id: "body-spool-joint",
    title: "Body + Spool Joint Welded Using Nickel Based Alloys by AUTO-TIG",
    category: "Specialised Welding",
    image: "/company-profile/pdf-page-04-image-06.jpg",
  },
  {
    id: "saw-overlay-ht",
    title: "SAW Overlay and Heat Treatment for Non-Sour Services",
    category: "Overlay Cladding",
    image: "/company-profile/pdf-page-04-image-03.jpg",
  },
  {
    id: "cryogenic-bonnet",
    title: "High Pressure Cryogenic Bonnet Valve Welding to RT Quality",
    category: "Cryogenic Welding",
    image: "/company-profile/pdf-page-05-image-07.jpg",
  },
  {
    id: "trunnion-ball-valve",
    title: "Trunnion Mounted Ball Valve Assembly Welded to RT Quality",
    category: "Valve Assembly",
    image: "/company-profile/pdf-page-05-image-08.jpg",
  },
  {
    id: "auto-tig-cladding",
    title: "Nickel Based Alloys Cladded on Full Body Area by AUTO-TIG and AUTO-MIG",
    category: "Overlay Cladding",
    image: "/company-profile/pdf-page-04-image-10.jpg",
  },
  {
    id: "seat-welding",
    title: "Overlay Pad Contact Area and Seat Welding Using AUTO-TIG",
    category: "Overlay Cladding",
    image: "/company-profile/pdf-page-05-image-03.jpg",
  },
  {
    id: "plug-valve-stellite",
    title: "Plug Valve Stellite-6 Coating",
    category: "Hard Facing",
    image: "/company-profile/pdf-page-05-image-01.jpg",
  },
  {
    id: "dissimilar-expander",
    title: "Expander & Reducer of Dissimilar Grades Welded",
    category: "Specialised Welding",
    image: "/company-profile/pdf-page-05-image-06.jpg",
  },
  {
    id: "in-situ-welding",
    title: "In-Situ Welding of Stellite and Colmonoy Grades",
    category: "Hard Facing",
    image: "/company-profile/pdf-page-05-image-05.jpg",
  },
  {
    id: "bypass-welding",
    title: "Bypass Welding of Valve Assembly to RT Quality",
    category: "Valve Assembly",
    image: "/company-profile/pdf-page-05-image-11.jpg",
  },
  {
    id: "gate-valve-fabrication",
    title: "Fabrication of Gate and Other Valve Types",
    category: "Fabrication",
    image: "/company-profile/pdf-page-05-image-11.jpg",
  },
  {
    id: "high-pressure-machining",
    title: "High Pressure Valve Machining and Welding",
    category: "Machining",
    image: "/company-profile/pdf-page-05-image-12.jpg",
  },
  {
    id: "f92-forging",
    title: "Forging F92 Grades Joint Welded",
    category: "Specialised Welding",
    image: "/company-profile/pdf-page-05-image-08.jpg",
  },
  {
    id: "small-size-hp",
    title: "Small Sizes High Pressure In-Situ and Joint Welded",
    category: "Specialised Welding",
    image: "/company-profile/pdf-page-05-image-09.jpg",
  },
];

export const QAWT_NOTE = "QAWT combines a wide experience of the industry's requirements to provide a complete service embracing all aspects of production, testing, certification and documentation.";

export const POSITIONER_CAPABILITY = "10 Tonnage Capacity Positioner for Cladding Purpose";

export const RFQ_ENDPOINT = import.meta.env.VITE_RFQ_ENDPOINT || "";
export const RFQ_WEBHOOK_HELP = "Set VITE_RFQ_ENDPOINT to your backend or Vercel function URL before accepting real submissions.";
