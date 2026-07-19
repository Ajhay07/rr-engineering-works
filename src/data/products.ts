export interface Product {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  applications: string[];
  material: string;
  process: string;
  sizeRange: string;
}

export { CAPABILITIES as PRODUCTS } from "./company";
