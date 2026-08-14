import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-[#FADF01] text-[#16160F] font-bold hover:bg-[#EDD400] shadow-[0_2px_8px_rgba(250,223,1,0.45)]",
        secondary:
          "bg-[var(--card)] text-[var(--ink)] border border-[var(--border)] shadow-[0_1px_2px_var(--shadow)] hover:border-[var(--ink)]",
        dark:
          "bg-[#16160F] text-[#FFFFFF] hover:bg-[#2B2B23]",
        approve:
          "bg-[#1E6E3C] text-[#FFFFFF] font-bold hover:bg-[#185C32] shadow-[0_2px_8px_rgba(30,110,60,0.28)]",
        reject:
          "border-[1.5px] border-[#D4373A] bg-transparent text-[#B12A2D] font-bold hover:bg-[#FBE9E9]",
        ghost:
          "bg-transparent text-[var(--ink)] hover:bg-[var(--hover)]",
        outline:
          "border border-[var(--border)] bg-transparent text-[var(--ink)] hover:border-[var(--ink)]",
      },
      size: {
        default: "h-11 px-5 py-2 text-[13.5px]",
        sm: "h-9 px-3.5 text-xs rounded-full",
        lg: "h-12 px-6 text-sm rounded-full",
        icon: "h-9 w-9 p-0 rounded-full",
        iconLg: "h-10 w-10 p-0 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
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
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
