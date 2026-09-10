import { cn } from "@/lib/utils";
import type { RFQStatus } from "@/types/rfq";

const STATUS_CONFIG: Record<
  RFQStatus,
  { label: string; dot: string; bg: string; text: string }
> = {
  New: {
    label: "New",
    dot: "bg-blue-500",
    bg: "bg-blue-50",
    text: "text-blue-700",
  },
  "Under Review": {
    label: "Under Review",
    dot: "bg-amber-500",
    bg: "bg-amber-50",
    text: "text-amber-700",
  },
  Quoted: {
    label: "Quoted",
    dot: "bg-emerald-500",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
  },
  Completed: {
    label: "Completed",
    dot: "bg-slate-500",
    bg: "bg-slate-100",
    text: "text-slate-700",
  },
  Rejected: {
    label: "Rejected",
    dot: "bg-red-500",
    bg: "bg-red-50",
    text: "text-red-700",
  },
};

export function StatusBadge({ status }: { status: RFQStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.75 text-xs font-medium",
        cfg.bg,
        cfg.text
      )}
    >
      <span className={cn("h-2 w-2 rounded-full", cfg.dot)} />
      {cfg.label}
    </span>
  );
}
