"use client";

import { useTranslations } from "next-intl";
import type { FileViewerLabels } from "./labels";

/**
 * Builds the viewer's copy from next-intl messages (namespace `fileViewer`),
 * so the overlay speaks the active locale without any provider.
 */
export const useFileViewerLabels = (): FileViewerLabels => {
  const t = useTranslations("fileViewer");

  return {
    filePreview: t("filePreview"),
    downloadShort: t("downloadShort"),
    openInTab: t("openInTab"),
    close: t("close"),
    previous: t("previous"),
    next: t("next"),
    viewerLoading: t("viewerLoading"),
    viewerError: t("viewerError"),
    viewerErrorHint: t("viewerErrorHint"),
    viewerRetry: t("viewerRetry"),
    noPreview: t("noPreview"),
    download: (fileName) => t("download", { fileName }),
  };
};
