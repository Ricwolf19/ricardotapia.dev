"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { FileText, Languages } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/Button";
import { FileViewer } from "@/components/file-viewer/FileViewer";
import { useFileViewerLabels } from "@/components/file-viewer/useFileViewerLabels";

type DocLang = "es" | "en";
/** Add a kind here (and its PDFs in public/) to offer another bilingual document. */
export type DocKind = "cv";

/** Files live in public/ as `<base>-<lang>.pdf`. */
const DOC_BASE: Record<DocKind, string> = { cv: "cv" };

interface DocumentButtonProps extends Pick<ButtonProps, "variant" | "size" | "className"> {
  doc: DocKind;
  label: string;
}

/**
 * Opens a bilingual PDF (the CV) in the FileViewer without
 * navigating, starting in the page's locale. The viewer header carries an
 * ES ⇄ EN toggle that swaps the file without closing the overlay.
 */
export const DocumentButton = ({
  doc,
  label,
  variant = "secondary",
  size,
  className,
}: DocumentButtonProps) => {
  const locale = useLocale();
  const t = useTranslations("cv");
  const labels = useFileViewerLabels();
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<DocLang>(locale === "en" ? "en" : "es");

  const fileName = `${DOC_BASE[doc]}-${lang}.pdf`;
  const file = { url: `/${fileName}`, fileName, mimeType: "application/pdf" };

  // No aria-label: the visible "ES ⇄ EN" plus the hint already name this
  // control, and repeating the hint there made a screen reader say it twice.
  const toggle = (
    <button
      type="button"
      onClick={() => setLang((current) => (current === "es" ? "en" : "es"))}
      title={t("toggleHint")}
      className="border-border-strong text-foreground hover:bg-surface-elevated focus-visible:ring-foreground/40 inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-md border px-3 py-1.5 font-mono text-xs whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:outline-none"
    >
      <Languages className="h-3.5 w-3.5" aria-hidden />
      ES ⇄ EN
      <span className="hidden opacity-70 sm:inline">· {t("toggleHint")}</span>
    </button>
  );

  return (
    <>
      <Button
        type="button"
        variant={variant}
        size={size}
        className={className}
        onClick={() => setOpen(true)}
      >
        <FileText className="h-4 w-4" aria-hidden />
        {label}
      </Button>

      <FileViewer
        file={open ? file : null}
        onClose={() => setOpen(false)}
        action={toggle}
        labels={labels}
      />
    </>
  );
};
