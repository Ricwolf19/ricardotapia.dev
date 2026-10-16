import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * One button scale for the whole site: every size shares the pill shape, the
 * mono face and the same press/hover motion, so CTAs line up side by side.
 */
export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border font-mono text-sm font-medium transition-[background-color,color,border-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "border-foreground bg-foreground text-background hover:bg-primary-hover hover:border-primary-hover hover:shadow-lg hover:shadow-foreground/15",
        secondary:
          "border-border-strong bg-transparent text-foreground hover:border-foreground hover:bg-surface-elevated",
        ghost:
          "border-transparent text-foreground-muted hover:bg-surface-elevated hover:text-foreground hover:translate-y-0",
      },
      size: {
        sm: "h-8 px-3.5 text-xs",
        md: "h-10 px-5",
        lg: "h-11 px-6",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export const Button = ({ className, variant, size, ...props }: ButtonProps) => (
  <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
);
