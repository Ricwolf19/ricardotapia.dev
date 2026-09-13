"use client";

import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { getMimeType } from "./mime";
import { type FileViewerLabels, resolveFileViewerLabels } from "./labels";
import { DownloadIcon, ExternalLinkIcon, FileWarningIcon } from "./icons";
import { Kbd } from "./Kbd";
import { FileViewerAction } from "./FileViewerAction";
import { useOverlayLayer } from "./overlayStack";
import { lockBodyScroll, unlockBodyScroll } from "./scrollLock";
import { useCoarsePointer } from "./useCoarsePointer";
import { useFocusTrap } from "./useFocusTrap";
import { useOverlayTransition } from "./useOverlayTransition";

/**
 * The viewer's empty states — failure and "no preview" — speak the overlay's
 * own language: no card, white on the black scrim, the same translucent
 * controls as the header.
 */
const EMPTY_STATE_CLASS = "mx-4 flex max-w-sm flex-col items-center text-center";
const EMPTY_TITLE_CLASS = "text-sm font-medium text-white";
const EMPTY_HINT_CLASS = "mt-1.5 text-xs leading-relaxed text-white/60";
/** Primary sits one step brighter than the header actions, never coloured. */
const EMPTY_PRIMARY_CLASS =
  "focus-visible:ring-primary rounded-md cursor-pointer bg-white/20 px-4 py-2 text-sm text-white transition-colors hover:bg-white/30 focus-visible:ring-2 focus-visible:outline-none";
const EMPTY_SECONDARY_CLASS =
  "focus-visible:ring-primary rounded-md cursor-pointer border border-white/20 px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:outline-none";

/** What the viewer needs to render a file. */
export type ViewableFile = {
  url: string;
  fileName?: string;
  mimeType?: string;
};

export type FileViewerProps = {
  /** File to show; `null` keeps the viewer closed. */
  file: ViewableFile | null;
  onClose: () => void;
  /**
   * The collection to browse. With more than one entry the viewer gains side
   * arrows and ←/→ keyboard navigation, starting at `file`'s position.
   */
  files?: ViewableFile[];
  /**
   * Replaces the built-in "could not load" panel. Receives the file that
   * failed and a `retry` that re-resolves and re-renders it.
   */
  renderError?: (context: { file: ViewableFile; retry: () => void }) => ReactNode;
  /**
   * Extra control rendered in the header, before the download/open actions —
   * e.g. the CV's ES ⇄ EN language toggle.
   */
  action?: ReactNode;
  labels?: Partial<FileViewerLabels>;
};

type Kind = "image" | "pdf" | "other";

const kindOf = (file: ViewableFile): Kind => {
  const mime = file.mimeType || getMimeType(file.fileName ?? file.url);
  if (mime.startsWith("image/")) return "image";
  if (mime === "application/pdf") return "pdf";
  return "other";
};

/**
 * iPadOS 13+ reports itself as a Mac, so the platform string alone misses it;
 * a Mac with a touchscreen is the tell.
 */
const isIosWebkit = (): boolean => {
  const ua = navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) || (ua.includes("Macintosh") && navigator.maxTouchPoints > 1);
};

/**
 * Whether an `<iframe>` will actually RENDER a PDF here. `pdfViewerEnabled`
 * is the browser answering the question directly (it is false on Android
 * Chrome, which downloads instead of embedding). WebKit on iOS answers yes
 * and then paints a frozen first page, so it stays excluded by name.
 */
const browserEmbedsPdf = (): boolean => {
  if (typeof navigator === "undefined") return false;
  if (navigator.pdfViewerEnabled === false) return false;
  return !isIosWebkit();
};

const Chevron = ({ direction }: { direction: "left" | "right" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
    aria-hidden
  >
    {direction === "left" ? <path d="m15 18-6-6 6-6" /> : <path d="m9 18 6-6-6-6" />}
  </svg>
);

/**
 * Full-screen file preview: images zoomed to fit, PDFs embedded, anything
 * else offered as a download. Pass `files` and it becomes a gallery: side
 * arrows, ←/→ on the keyboard, a position counter.
 *
 * Portals to `<body>` so an ancestor's stacking context can never trap it,
 * and traps focus while open.
 */
export const FileViewer = ({
  file,
  onClose,
  files,
  renderError,
  action,
  labels,
}: FileViewerProps) => {
  const copy = resolveFileViewerLabels(labels);
  const coarse = useCoarsePointer();
  const [url, setUrl] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  // Bumping it re-runs the resolution — the retry button after a failure.
  const [attempt, setAttempt] = useState(0);
  const retry = useCallback(() => setAttempt((previous) => previous + 1), []);
  const panelRef = useRef<HTMLDivElement>(null);
  const open = file !== null;
  const { mounted, entered } = useOverlayTransition(open);
  const layer = useOverlayLayer(open);
  useFocusTrap(open, panelRef);

  // Gallery cursor. Synced to `file`'s position whenever the viewer opens.
  const list = files && files.length > 0 ? files : null;
  const [cursor, setCursor] = useState(0);
  useEffect(() => {
    if (!file || !list) return;
    const index = list.findIndex((entry) => entry.url === file.url);
    setCursor(index >= 0 ? index : 0);
    // Only the opening file may reposition the cursor, not a list rebuild.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const current = open ? (list ? (list[cursor] ?? file) : file) : null;

  // The exit animation still needs something to draw after `file` nulls out —
  // both the descriptor AND its resolved URL, or the fade-out would swap the
  // file for the "loading" text for its whole duration.
  const lastViewRef = useRef<ViewableFile | null>(null);
  if (current) lastViewRef.current = current;

  const navigate = useCallback(
    (delta: number) => {
      if (!list) return;
      setCursor((previous) => Math.min(list.length - 1, Math.max(0, previous + delta)));
    },
    [list],
  );

  const currentUrl = current?.url;

  useEffect(() => {
    if (!current) {
      setUrl(null);
      setFailed(false);
      return;
    }
    let alive = true;
    setUrl(null);
    setFailed(false);
    void (async () => {
      try {
        // Static files resolve to themselves; the async shape stays so a
        // resolver can be slotted back in without touching the call sites.
        const resolved = current.url;
        if (!alive) return;
        setUrl(resolved);
      } catch {
        // A dropped connection must surface as a retryable state, never as
        // an eternal "Cargando…".
        if (alive) {
          setUrl(null);
          setFailed(true);
        }
      }
    })();
    return () => {
      alive = false;
    };
    // `currentUrl` stands in for `current`: a rebuilt array with the same
    // entry must not re-resolve.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUrl, attempt]);

  const lastUrlRef = useRef<string | null>(null);
  if (url) lastUrlRef.current = url;

  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  // Clicking the anchors is what downloads/opens: replicating their behaviour
  // from a handler would mean re-deriving `download` and popup rules.
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const openTabRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      // A modifier means the key belongs to the browser (⌘D bookmarks,
      // ⌘O opens a file): claiming it would fire our action AND theirs.
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key === "Escape") {
        // Only the innermost overlay answers, then claims the key so a
        // host dialog underneath does not close on the same press.
        if (!layer.isTopmost()) return;
        event.stopPropagation();
        closeRef.current();
        return;
      }
      if (event.key === "ArrowLeft") navigate(-1);
      if (event.key === "ArrowRight") navigate(1);
      // Bare letters, like the arrows above: the viewer is modal and
      // traps focus, so nothing else can be listening.
      const key = event.key.toLowerCase();
      if (key === "d") downloadRef.current?.click();
      if (key === "o") openTabRef.current?.click();
    };
    // Capture phase: it must run BEFORE any bubble-phase dialog handler.
    window.addEventListener("keydown", onKey, true);
    lockBodyScroll();
    return () => {
      window.removeEventListener("keydown", onKey, true);
      unlockBodyScroll();
    };
  }, [open, navigate, layer]);

  // Lazy initializer, not an effect: `navigator` cannot change under the
  // component, and starting at `true` painted one iframe frame on iOS before
  // correcting to the download card.
  const [canEmbedPdf] = useState(browserEmbedsPdf);

  const view = current ?? lastViewRef.current;
  const shownUrl = url ?? (open ? null : lastUrlRef.current);
  if (!mounted || !view) return null;
  const kind = kindOf(view);
  // Drives BOTH the branch and the stretch class: the iframe is the only
  // child that fills its container.
  const showsPdf = kind === "pdf" && canEmbedPdf && !failed && !!shownUrl;
  const hasGallery = list !== null && list.length > 1;

  const arrow =
    "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/25 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none disabled:pointer-events-none disabled:opacity-25";

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-[1000] flex flex-col bg-black/85 transition-opacity duration-200 ease-out",
        entered ? "opacity-100" : "opacity-0",
        !open && "pointer-events-none",
      )}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={view.fileName ?? copy.filePreview}
    >
      <div
        className="flex items-center justify-between gap-2 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="min-w-0 flex-1 truncate text-xs font-medium text-white sm:text-sm">
          {view.fileName ?? copy.filePreview}
        </p>
        {hasGallery && (
          <span className="shrink-0 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white tabular-nums">
            {cursor + 1} / {list.length}
          </span>
        )}
        {/* Host-provided extra control (e.g. the CV language toggle). */}
        {action}
        {shownUrl && (
          <>
            <FileViewerAction
              ref={downloadRef}
              href={shownUrl}
              download={view.fileName}
              label={copy.downloadShort}
              icon={<DownloadIcon className="h-4 w-4" />}
              compact={coarse}
            />
            <FileViewerAction
              ref={openTabRef}
              href={shownUrl}
              newTab
              label={copy.openInTab}
              icon={<ExternalLinkIcon className="h-4 w-4" />}
              compact={coarse}
            />
          </>
        )}
        <FileViewerAction
          onClick={onClose}
          label={copy.close}
          icon="✕"
          compact={coarse}
          iconAlways
        />
      </div>

      <div
        ref={panelRef}
        tabIndex={-1}
        className={cn(
          "relative flex min-h-0 flex-1 items-center justify-center p-3 outline-none sm:p-4",
          showsPdf && "items-stretch",
        )}
        onClick={(event) => event.stopPropagation()}
      >
        {hasGallery && (
          <>
            <button
              type="button"
              onClick={() => navigate(-1)}
              disabled={cursor === 0}
              aria-label={copy.previous}
              className={cn(arrow, "left-2 sm:left-4")}
            >
              <Chevron direction="left" />
            </button>
            <button
              type="button"
              onClick={() => navigate(1)}
              disabled={cursor === list.length - 1}
              aria-label={copy.next}
              className={cn(arrow, "right-2 sm:right-4")}
            >
              <Chevron direction="right" />
            </button>
          </>
        )}

        {failed ? (
          (renderError?.({ file: view, retry }) ?? (
            <div className={EMPTY_STATE_CLASS}>
              <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-white/70 ring-1 ring-white/10">
                <FileWarningIcon className="h-8 w-8" />
              </span>
              <p className={EMPTY_TITLE_CLASS}>{copy.viewerError}</p>
              <p className={EMPTY_HINT_CLASS}>{copy.viewerErrorHint}</p>
              {view.fileName && (
                <p className="mt-3 max-w-full truncate font-mono text-[11px] text-white/40">
                  {view.fileName}
                </p>
              )}
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <button type="button" onClick={retry} className={EMPTY_PRIMARY_CLASS}>
                  {copy.viewerRetry}
                </button>
                {/* The bytes may still be reachable even when
                    the preview is not — never a dead end. */}
                {shownUrl && (
                  <a href={shownUrl} download={view.fileName} className={EMPTY_SECONDARY_CLASS}>
                    {copy.downloadShort}
                  </a>
                )}
              </div>
            </div>
          ))
        ) : !shownUrl ? (
          <p className="text-sm text-white/70">{copy.viewerLoading}</p>
        ) : kind === "image" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={shownUrl}
            alt={view.fileName ?? ""}
            // A resolved url only proves the address; the object
            // behind it can still 404, and an untracked failure
            // renders as an invisible image.
            onError={() => setFailed(true)}
            className={cn(
              "max-h-full max-w-full rounded-lg object-contain shadow-2xl",
              "transition-transform duration-200 ease-out",
              entered ? "scale-100" : "scale-[0.97]",
            )}
          />
        ) : showsPdf ? (
          <iframe
            src={shownUrl}
            title={view.fileName ?? "PDF"}
            // Best effort: a cross-origin 404 usually renders the
            // browser's own error page inside the frame and fires
            // `load`, so this catches only the cases it can.
            onError={() => setFailed(true)}
            className="h-full w-full max-w-4xl rounded-lg bg-white shadow-2xl"
          />
        ) : (
          <div className={EMPTY_STATE_CLASS}>
            <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-white/70 ring-1 ring-white/10">
              <FileWarningIcon className="h-8 w-8" />
            </span>
            <p className={EMPTY_TITLE_CLASS}>{copy.noPreview}</p>
            {view.fileName && (
              <p className="mt-3 max-w-full truncate font-mono text-[11px] text-white/40">
                {view.fileName}
              </p>
            )}
            <a
              href={shownUrl}
              download={view.fileName}
              target="_blank"
              rel="noreferrer"
              className={cn(EMPTY_PRIMARY_CLASS, "mt-5 inline-block")}
            >
              {copy.download(view.fileName ?? copy.filePreview)}
            </a>
          </div>
        )}
      </div>

      {/* Shortcut hints — pointless on touch, so fine pointers only. */}
      {!coarse && (
        <div
          className="flex items-center justify-center gap-4 pb-3 text-[11px] text-white/60"
          onClick={(event) => event.stopPropagation()}
        >
          <span className="flex items-center gap-1.5">
            <Kbd>Esc</Kbd> {copy.close}
          </span>
          {shownUrl && (
            <>
              <span className="flex items-center gap-1.5">
                <Kbd>D</Kbd> {copy.downloadShort}
              </span>
              <span className="flex items-center gap-1.5">
                <Kbd>O</Kbd> {copy.openInTab}
              </span>
            </>
          )}
          {hasGallery && (
            <span className="flex items-center gap-1.5">
              <Kbd>←</Kbd>
              <Kbd>→</Kbd> {copy.previous} / {copy.next}
            </span>
          )}
        </div>
      )}
    </div>,
    document.body,
  );
};
