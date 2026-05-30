import type { LabelHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Label = ({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) => (
  <label
    className={cn("text-foreground-muted mb-1.5 block font-mono text-xs font-medium", className)}
    {...props}
  />
);
