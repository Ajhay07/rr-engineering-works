import { ArrowUpRight, FileText } from "lucide-react";
import type { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <Reveal delay={(index % 4) * 0.08}>
      <div className="group relative flex flex-col rounded-xl border border-line bg-white overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 h-full">
        <div className="relative aspect-[4/3] overflow-hidden bg-primary-50">
          <img
            src={product.image}
            alt={`${product.name} — industrial valve`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Scan-line hover detail, the product card's signature motif */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden"
            aria-hidden="true"
          >
            <div className="absolute left-0 right-0 h-10 bg-gradient-to-b from-accent/0 via-accent/25 to-accent/0 animate-scanline" />
          </div>
          <div className="absolute top-3 right-3 font-mono-data text-[10px] uppercase tracking-wide text-white bg-navy/70 backdrop-blur px-2 py-1 rounded">
            {product.sizeRange}
          </div>
        </div>

        <div className="flex flex-col flex-1 p-5 sm:p-6">
          <h3 className="font-display text-lg font-semibold text-navy mb-2">
            {product.name}
          </h3>
          <p className="text-sm text-steel leading-relaxed mb-4 flex-1">
            {product.description}
          </p>

          <div className="mb-4">
            <p className="font-mono-data text-[10px] uppercase tracking-wider text-primary mb-1.5">
              Applications
            </p>
            <div className="flex flex-wrap gap-1.5">
              {product.applications.map((app) => (
                <span
                  key={app}
                  className="text-[11px] rounded-md bg-primary-50 text-primary-600 px-2 py-1 font-medium"
                >
                  {app}
                </span>
              ))}
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-3 mb-5 rounded-lg bg-navy/[0.03] p-3 border border-line">
            <div>
              <dt className="font-mono-data text-[10px] uppercase tracking-wider text-steel">
                Material
              </dt>
              <dd className="font-mono-data text-xs text-navy mt-0.5">{product.material}</dd>
            </div>
            <div>
              <dt className="font-mono-data text-[10px] uppercase tracking-wider text-steel">
                Process
              </dt>
              <dd className="font-mono-data text-xs text-navy mt-0.5">{product.process}</dd>
            </div>
          </dl>

          <div className="flex flex-col gap-2.5 mt-auto">
            <Button size="sm" className="w-full" asChild>
              <a href="#contact" aria-label={`Request quote for ${product.name}`}>
                Request Quote
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </Button>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <a href={`#products`} aria-label={`Learn more about ${product.name}`}>
                <FileText className="h-3.5 w-3.5" />
                Learn More
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
