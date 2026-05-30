import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Si false, no envuelve en Container (para secciones full-bleed). */
  contained?: boolean;
}

/** Sección con respiración vertical generosa (spec §3: space-y-24). */
export const Section = ({ className, contained = true, children, ...props }: SectionProps) => (
  <section className={cn("py-16 sm:py-20", className)} {...props}>
    {contained ? <Container>{children}</Container> : children}
  </section>
);
