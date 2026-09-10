import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle, Info, TriangleAlert, XCircle } from "lucide-react";

export type AlertVariant = "default" | "success" | "error" | "warning" | "info";

const iconMap: Record<AlertVariant, React.ElementType> = {
  default: Info,
  success: CheckCircle,
  error: XCircle,
  warning: TriangleAlert,
  info: Info,
};

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
}

const variantClasses: Record<AlertVariant, string> = {
  default: "bg-slate-50 text-slate-800 border-slate-200",
  success: "bg-green-50 text-green-800 border-green-200",
  error: "bg-red-50 text-red-800 border-red-200",
  warning: "bg-amber-50 text-amber-800 border-amber-200",
  info: "bg-sky-50 text-sky-800 border-sky-200",
};

export function Alert({
  className,
  variant = "default",
  children,
  ...props
}: AlertProps) {
  const Icon = iconMap[variant];
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border px-4 py-3 text-sm",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      <Icon className="mt-0.25 h-4 w-4 shrink-0" />
      <div className="flex-1">{children}</div>
    </div>
  );
}
