import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** If false, does not wrap in Container (for full-bleed sections). */
  contained?: boolean;
  /** Forwarded to Container: grids and two-column layouts need the wider column. */
  wide?: boolean;
}

export const Section = ({
  className,
  contained = true,
  wide = false,
  children,
  ...props
}: SectionProps) => (
  <section className={cn("py-12 sm:py-16", className)} {...props}>
    {contained ? <Container wide={wide}>{children}</Container> : children}
  </section>
);
