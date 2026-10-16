import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Reading-width column by default; `wide` for grids and two-column layouts. */
  wide?: boolean;
}

export const Container = ({ className, wide = false, ...props }: ContainerProps) => (
  <div
    className={cn("mx-auto w-full px-6", wide ? "max-w-5xl" : "max-w-3xl", className)}
    {...props}
  />
);
