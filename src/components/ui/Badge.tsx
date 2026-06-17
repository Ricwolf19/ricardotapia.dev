import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs font-medium",
  {
    variants: {
      variant: {
        default: "border-border-strong bg-surface-elevated text-foreground-muted",
        accent: "border-accent/40 bg-accent/15 text-accent",
        production: "border-success/40 bg-success/15 text-success",
        development: "border-warning/40 bg-warning/15 text-warning",
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
