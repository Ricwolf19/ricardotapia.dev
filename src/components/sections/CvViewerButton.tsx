"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { FileText, Languages } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { FileViewer } from "@/components/file-viewer/FileViewer";
import { useFileViewerLabels } from "@/components/file-viewer/useFileViewerLabels";
import { cn } from "@/lib/utils";

type CvLang = "es" | "en";

/**
 * Hero CTA: opens the CV in the custom full-screen FileViewer without
 * navigating. The viewer header carries an ES ⇄ EN toggle that swaps the
 * displayed PDF (cv-es.pdf / cv-en.pdf) without closing the overlay.
 */
export const CvViewerButton = ({ label }: { label: string }) => {
  const locale = useLocale();
  const t = useTranslations("cv");
  const labels = useFileViewerLabels();
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<CvLang>(locale === "en" ? "en" : "es");

  const file = {
    url: `/cv-${lang}.pdf`,
    fileName: `cv-${lang}.pdf`,
    mimeType: "application/pdf",
  };

  // No aria-label: the visible "ES ⇄ EN" plus the hint already name this
  // control, and repeating the hint there made a screen reader say it twice.
  const toggle = (
    <button
      type="button"
      onClick={() => setLang((current) => (current === "es" ? "en" : "es"))}
      title={t("toggleHint")}
      className="border-accent/60 bg-accent/15 text-accent focus-visible:ring-primary hover:bg-accent/25 inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:outline-none"
    >
      <Languages className="h-3.5 w-3.5" aria-hidden />
      ES ⇄ EN
      <span className="hidden opacity-70 sm:inline">· {t("toggleHint")}</span>
    </button>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
      >
        <FileText className="h-4 w-4" />
        {label}
      </button>

      <FileViewer
        file={open ? file : null}
        onClose={() => setOpen(false)}
        action={toggle}
        labels={labels}
      />
    </>
  );
};
