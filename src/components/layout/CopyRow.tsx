"use client";

import { useEffect, useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyRowProps {
  label: string;
  /** What the row shows. */
  value: string;
  /** What gets copied; defaults to `value`. */
  copyValue?: string;
  /** Optional destination for the small external-link icon. */
  href?: string;
  copiedLabel: string;
  openLabel?: string;
}

/**
 * One line of shareable info: label, value, copy on click, with a short
 * "copied" confirmation. Built for the sidebar, where a recruiter grabs an
 * email or a handle without opening the contact page.
 */
export const CopyRow = ({
  label,
  value,
  copyValue,
  href,
  copiedLabel,
  openLabel,
}: CopyRowProps) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(copyValue ?? value);
      setCopied(true);
    } catch {
      // Clipboard blocked (http, permissions): nothing to do, the text is selectable.
    }
  };

  return (
    <div className="group flex items-center gap-2 font-mono text-xs">
      <button
        type="button"
        onClick={copy}
        aria-live="polite"
        title={copiedLabel}
        className="flex min-w-0 flex-1 items-center gap-2 text-left"
      >
        <span className="text-foreground-dim w-12 shrink-0 text-[10px] tracking-wider uppercase">
          {label}
        </span>
        <span
          className={cn(
            "truncate transition-colors",
            copied ? "text-success" : "text-foreground-muted group-hover:text-foreground",
          )}
        >
          {copied ? copiedLabel : value}
        </span>
        {copied ? (
          <Check className="text-success h-3 w-3 shrink-0" aria-hidden />
        ) : (
          <Copy
            className="text-foreground-dim h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
            aria-hidden
          />
        )}
      </button>
      {href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={openLabel ? `${openLabel}: ${value}` : value}
          className="text-foreground-dim hover:text-foreground shrink-0 transition-colors"
        >
          <ExternalLink className="h-3 w-3" aria-hidden />
        </a>
      )}
    </div>
  );
};
