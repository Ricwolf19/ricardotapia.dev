import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";

interface PreviewSectionProps {
  /** 1-based; rendered zero-padded ("01 — proyectos"). */
  index: number;
  label: string;
  title?: string;
  href: string;
  viewAllLabel: string;
  children: ReactNode;
}

/** One numbered home block: label row, optional heading, content, "view all". */
export const PreviewSection = ({
  index,
  label,
  title,
  href,
  viewAllLabel,
  children,
}: PreviewSectionProps) => (
  <section className="reveal border-border border-t py-12">
    <p className="text-foreground-dim font-mono text-xs tabular-nums">
      {String(index).padStart(2, "0")} — {label}
    </p>
    {title && <h2 className="mt-2 text-2xl tracking-tight">{title}</h2>}
    <div className="mt-6">{children}</div>
    <Link
      href={href}
      className="group text-foreground-muted hover:text-foreground mt-6 inline-flex items-center gap-1 font-mono text-sm transition-colors"
    >
      {viewAllLabel}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  </section>
);
