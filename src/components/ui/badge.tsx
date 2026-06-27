import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "accent" | "outline" | "navy";
}

export function Badge({ className, variant = "primary", ...props }: BadgeProps) {
  const variants = {
    primary: "bg-primary-50 text-primary-600 border border-primary-200",
    accent: "bg-accent-50 text-accent border border-accent/30",
    outline: "bg-transparent text-steel border border-line",
    navy: "bg-navy/5 text-navy border border-navy/15",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold font-mono-data uppercase tracking-wide",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
