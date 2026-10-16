import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Outlined, monochrome pills. Status variants add a small colored dot instead
 * of a tinted fill, so the palette stays black and white.
 */
const dot =
  "before:mr-1.5 before:inline-block before:h-1.5 before:w-1.5 before:rounded-full before:content-['']";

export const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-border text-foreground-muted",
        accent: "border-foreground/30 text-foreground",
        production: `border-border text-foreground-muted before:bg-success ${dot}`,
        development: `border-border text-foreground-muted before:bg-warning ${dot}`,
        internal: `border-border text-foreground-dim before:bg-foreground-dim ${dot}`,
        archived: `border-border text-foreground-dim before:bg-border-strong ${dot}`,
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
