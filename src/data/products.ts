export interface Product {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  applications: string[];
  material: string;
  pressureRating: string;
  sizeRange: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "gate-valve",
    name: "Gate Valve",
    slug: "gate-valve",
    image:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=800&q=80",
    description:
      "Full-bore on/off isolation valves engineered for minimal pressure drop in straight-line flow applications.",
    applications: ["Pipeline isolation", "Water treatment", "Refinery transfer lines"],
    material: "Cast Steel / SS316 / WCB",
    pressureRating: "PN16 - PN420",
    sizeRange: "DN15 - DN1200",
  },
  {
    id: "globe-valve",
    name: "Globe Valve",
    slug: "globe-valve",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    description:
      "Precision throttling valves delivering accurate flow regulation with tight shutoff for demanding process lines.",
    applications: ["Flow throttling", "Steam systems", "Chemical dosing lines"],
    material: "Forged Steel / SS304 / Bronze",
    pressureRating: "PN16 - PN250",
    sizeRange: "DN15 - DN600",
  },
  {
    id: "ball-valve",
    name: "Ball Valve",
    slug: "ball-valve",
    image:
      "https://images.unsplash.com/photo-1597149961611-0d6e2c9f0cd4?auto=format&fit=crop&w=800&q=80",
    description:
      "Quarter-turn floating and trunnion-mounted ball valves built for rapid, low-torque shutoff in high-cycle service.",
    applications: ["Oil & gas pipelines", "Tank farms", "Process isolation"],
    material: "SS316 / Duplex / Carbon Steel",
    pressureRating: "PN16 - PN420",
    sizeRange: "DN15 - DN900",
  },
  {
    id: "butterfly-valve",
    name: "Butterfly Valve",
    slug: "butterfly-valve",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    description:
      "Compact, lightweight quarter-turn valves suited for large-diameter flow control with minimal installation footprint.",
    applications: ["Water distribution", "HVAC systems", "Marine ballast lines"],
    material: "Ductile Iron / SS316 / CF8M",
    pressureRating: "PN10 - PN160",
    sizeRange: "DN50 - DN1800",
  },
  {
    id: "check-valve",
    name: "Check Valve",
    slug: "check-valve",
    image:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=800&q=80",
    description:
      "Non-return valves preventing reverse flow and water-hammer damage across pumping and gravity-fed systems.",
    applications: ["Pump discharge lines", "Fire protection systems", "Boiler feedwater"],
    material: "Cast Steel / SS316 / Bronze",
    pressureRating: "PN16 - PN320",
    sizeRange: "DN15 - DN900",
  },
  {
    id: "needle-valve",
    name: "Needle Valve",
    slug: "needle-valve",
    image:
      "https://images.unsplash.com/photo-1581093458791-9d42cc25c4d7?auto=format&fit=crop&w=800&q=80",
    description:
      "Fine-metering valves for precise, low-flow control in instrumentation, sampling, and calibration lines.",
    applications: ["Instrumentation panels", "Sampling systems", "Pressure gauge isolation"],
    material: "SS316 / Monel / Forged Brass",
    pressureRating: "PN64 - PN420",
    sizeRange: "DN6 - DN50",
  },
  {
    id: "pressure-relief-valve",
    name: "Pressure Relief Valve",
    slug: "pressure-relief-valve",
    image:
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80",
    description:
      "Safety relief valves certified to automatically vent excess pressure and protect vessels, lines, and personnel.",
    applications: ["Boiler safety systems", "Pressure vessels", "Storage tank protection"],
    material: "Carbon Steel / SS316 / WCB",
    pressureRating: "PN25 - PN400",
    sizeRange: "DN15 - DN300",
  },
  {
    id: "control-valve",
    name: "Control Valve",
    slug: "control-valve",
    image:
      "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=800&q=80",
    description:
      "Actuated valves delivering automated, repeatable flow modulation integrated with plant control systems.",
    applications: ["Process automation", "Power plant feed control", "Refinery DCS integration"],
    material: "SS316 / Alloy Steel / WCC",
    pressureRating: "PN16 - PN320",
    sizeRange: "DN15 - DN400",
  },
];
