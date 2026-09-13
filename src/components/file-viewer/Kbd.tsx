import type { ReactNode } from "react";

/** The little key hint every shortcut announces itself with. */
export const Kbd = ({ children }: { children: ReactNode }) => (
  <kbd className="border-border bg-surface text-foreground-muted rounded-md border px-1.5 py-0.5 font-sans text-[10px] font-medium shadow-sm">
    {children}
  </kbd>
);
