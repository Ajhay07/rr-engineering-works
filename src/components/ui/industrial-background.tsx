import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Premium industrial / manufacturing background.
 *
 * Visual language: a precision-engineered grid + subtle tooling accents, all
 * rendered with SVG/CSS so there are NO external image assets (fast,
 * responsive, cacheable). A dark radial gradient overlay maintains contrast so
 * hero typography reads cleanly on any screen.
 *
 * Used as the wrapper `<section>` for the Hero so the existing 2-column
 * layout and "buyer desk" aside compose as plain children.
 */
export function IndustrialBackground({
  children,
  className,
  id,
}: {
  children?: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative isolate overflow-hidden text-white pt-28 sm:pt-32",
        "bg-[radial-gradient(ellipse_at_top,_#0f141f_60%,_#0a0f19_100%)]",
        className
      )}
    >
      {/* Precision grid texture (SVG, zero network requests) */}
      <svg
        className="absolute inset-0 -z-10 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="industrial-grid"
            width="56"
            height="56"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 56 0 L 0 0 0 56"
              strokeWidth="1"
              stroke="rgba(255,255,255,0.045)"
              fill="none"
            />
          </pattern>
          <mask id="grid-fade">
            <linearGradient
              id="grid-fade-gradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#0f141f" />
              <stop offset="100%" stopColor="#0a0f19" />
            </linearGradient>
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#industrial-grid)"
          mask="url(#grid-fade)"
        />
      </svg>

      {/* Soft engineered-glow accents for depth */}
      <div
        aria-hidden="true"
        className="absolute -left-1/2 -top-36 h-96 w-[28rem] -rotate-12 rounded-full blur-3xl"
        style={{ backgroundColor: "hsl(210 90% 60% / 0.14)" }}
      />
      <div
        aria-hidden="true"
        className="absolute -right-1/2 -bottom-24 h-80 w-[24rem] rotate-12 rounded-full blur-3xl"
        style={{ backgroundColor: "hsl(340 80% 52% / 0.12)" }}
      />

      {children}
    </section>
  );
}
