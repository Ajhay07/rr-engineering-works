import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-white shadow-card hover:bg-accent-hover hover:shadow-card-hover hover:-translate-y-0.5",
        secondary:
          "bg-primary text-white shadow-card hover:bg-primary-600 hover:shadow-card-hover hover:-translate-y-0.5",
        outline:
          "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white",
        ghost: "text-navy hover:bg-primary-50",
        white: "bg-white text-primary hover:bg-primary-50 shadow-card",
      },
      size: {
        default: "h-12 px-6",
        sm: "h-10 px-4 text-[13px]",
        lg: "h-14 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
