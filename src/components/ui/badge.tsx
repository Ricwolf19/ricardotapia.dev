import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs font-medium",
  {
    variants: {
      variant: {
        default: "border-border-strong bg-surface-elevated text-foreground-muted",
        accent: "border-accent/30 bg-accent/10 text-accent",
        production: "border-success/30 bg-success/10 text-success",
        development: "border-warning/30 bg-warning/10 text-warning",
        internal: "border-border-strong bg-surface-elevated text-foreground-dim",
        archived: "border-border-strong bg-surface-elevated text-foreground-dim",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export const Badge = ({ className, variant, ...props }: BadgeProps) => (
  <span className={cn(badgeVariants({ variant }), className)} {...props} />
);
