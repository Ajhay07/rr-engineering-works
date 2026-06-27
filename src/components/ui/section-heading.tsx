import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      <div
        className={cn(
          "inline-flex items-center gap-2 font-mono-data text-xs font-medium uppercase tracking-[0.18em] mb-4",
          light ? "text-primary-300" : "text-primary"
        )}
      >
        <span className="h-px w-6 bg-accent" />
        {eyebrow}
      </div>
      <h2
        className={cn(
          "font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold leading-[1.15] text-balance",
          light ? "text-white" : "text-navy"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base sm:text-lg leading-relaxed",
            light ? "text-white/70" : "text-steel"
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
