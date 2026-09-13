/**
 * Every user-facing string the FileViewer renders, so no copy is hardcoded
 * inside the component. English is the default; the localized hook
 * (`useFileViewerLabels`) builds the active set from next-intl messages.
 */
export type FileViewerLabels = {
  /** Fallback title when the file carries no name. */
  filePreview: string;
  /** Header action; the long `download` names a file, this labels a button. */
  downloadShort: string;
  /** Open the file in a browser tab. */
  openInTab: string;
  /** Close button. */
  close: string;
  /** aria-label of the previous-image arrow. */
  previous: string;
  /** aria-label of the next-image arrow. */
  next: string;
  /** While the URL resolves. */
  viewerLoading: string;
  /** The URL could not be resolved (expired signature, network). */
  viewerError: string;
  /** Second line of the error panel — what the reader can do about it. */
  viewerErrorHint: string;
  /** Button that retries the resolution. */
  viewerRetry: string;
  /** Formats without an inline preview. */
  noPreview: string;
  /** Download button. Receives the file name. */
  download: (fileName: string) => string;
};

export const DEFAULT_FILE_VIEWER_LABELS: FileViewerLabels = {
  filePreview: "File",
  downloadShort: "Download",
  openInTab: "Open in tab",
  close: "Close",
  previous: "Previous",
  next: "Next",
  viewerLoading: "Loading…",
  viewerError: "The preview could not be loaded",
  viewerErrorHint: "The file may have moved or the link expired. You can retry or download it.",
  viewerRetry: "Retry",
  noPreview: "This format has no preview",
  download: (fileName) => `Download ${fileName}`,
};

/** Partial overrides merged over the default set. */
export const resolveFileViewerLabels = (labels?: Partial<FileViewerLabels>): FileViewerLabels => ({
  ...DEFAULT_FILE_VIEWER_LABELS,
  ...labels,
});
