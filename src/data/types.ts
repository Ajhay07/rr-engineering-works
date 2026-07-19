import type { LucideIcon } from "lucide-react";

export interface Industry {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
}

export interface QualityStep {
  step: number;
  title: string;
  description: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  fileType: string;
  fileSize: string;
  href: string;
}

export interface ManufacturingStage {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface WhyChooseFeature {
  title: string;
  description: string;
  icon: LucideIcon;
}
