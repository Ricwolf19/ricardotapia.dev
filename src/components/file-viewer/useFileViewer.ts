"use client";

import { useCallback, useMemo, useState } from "react";
import type { ViewableFile } from "./FileViewer";

export type UseFileViewerReturn = {
  /** Currently open file, `null` when closed. */
  viewing: ViewableFile | null;
  open: (file: ViewableFile) => void;
  close: () => void;
  /** Spread into `<FileViewer {...viewerProps} />` — the whole wiring. */
  viewerProps: { file: ViewableFile | null; onClose: () => void };
};

/**
 * The open/close state every screen with a `FileViewer` repeats:
 *
 * ```tsx
 * const viewer = useFileViewer();
 * <button onClick={() => viewer.open(file)}>Ver</button>
 * <FileViewer {...viewer.viewerProps} />
 * ```
 */
export const useFileViewer = (): UseFileViewerReturn => {
  const [viewing, setViewing] = useState<ViewableFile | null>(null);
  const close = useCallback(() => setViewing(null), []);
  const open = useCallback((file: ViewableFile) => setViewing(file), []);

  return {
    viewing,
    open,
    close,
    viewerProps: useMemo(() => ({ file: viewing, onClose: close }), [viewing, close]),
  };
};
