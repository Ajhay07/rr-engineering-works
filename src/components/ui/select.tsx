import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectProps {
  label?: string;
  value?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  className?: string;
}

const Select = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectProps
>(({ label, value, placeholder = "Select...", options, onChange, className }, ref) => {
  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">
          {label}
        </label>
      )}
      <SelectPrimitive.Root value={value} onValueChange={onChange}>
        <SelectPrimitive.Trigger
          ref={ref}
          className="relative w-full cursor-pointer rounded-lg border border-slate-300/60 bg-slate-50 px-4 py-2.5 text-left text-sm text-navy placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
        >
          <span className="truncate">
            {value
              ? options.find((o) => o.value === value)?.label
              : placeholder}
          </span>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            sideOffset={6}
            className="z-50 overflow-y-auto rounded-lg border border-slate-200 bg-white py-1 shadow-lg focus:outline-none"
          >
            <SelectPrimitive.ScrollUpButton className="flex h-6 cursor-default items-center justify-center text-slate-500">
              <ChevronDown className="h-4 w-4" />
            </SelectPrimitive.ScrollUpButton>
            <SelectPrimitive.Viewport>
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  className="relative flex cursor-pointer items-center gap-2 px-4 py-2 text-sm text-navy hover:bg-slate-100 focus:bg-slate-100"
                >
                  <span className="absolute right-0 flex h-full w-3.5 items-center justify-center">
                    <Check className="h-3.5 w-3.5 text-accent" />
                  </span>
                  <span className="truncate">{option.label}</span>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
            <SelectPrimitive.ScrollDownButton className="flex h-6 cursor-default items-center justify-center text-slate-500">
              <ChevronDown className="h-4 w-4" />
            </SelectPrimitive.ScrollDownButton>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </div>
  );
});
Select.displayName = "Select";

export { Select };
