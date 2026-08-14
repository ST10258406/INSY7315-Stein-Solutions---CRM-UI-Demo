import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-colors whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-[var(--chip)] text-[var(--ink)]",
        pending: "bg-[#FDF3DA] text-[#8A6100]",
        active: "bg-[#E5F4E9] text-[#1E6E3C]",
        lapsed: "bg-[#FBE9E9] text-[#9B2C2C]",
        rejected: "bg-[#EFEFEC] text-[#5F5F57]",
        yellow: "bg-[#FADF01] text-[#16160F]",
        admin: "bg-[var(--card)] text-[var(--muted)] border border-[var(--border)] tracking-wider text-[10.5px]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dotColor?: string;
}

function Badge({ className, variant, dotColor, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {dotColor && (
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: dotColor }}
        />
      )}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
