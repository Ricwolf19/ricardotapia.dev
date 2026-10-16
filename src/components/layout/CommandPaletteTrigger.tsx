"use client";

import { useEffect, useState } from "react";
import { Command } from "lucide-react";
import { OPEN_COMMAND_PALETTE_EVENT } from "./command-palette-event";

/** Reads the platform without the deprecated `navigator.platform` where the newer API exists. */
const isApplePlatform = () => {
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
  const platform = nav.userAgentData?.platform ?? nav.platform ?? "";
  return /mac|iphone|ipad/i.test(platform);
};

/** Sidebar/overlay trigger for the command palette: label plus the ⌘K / Ctrl K hint. */
export const CommandPaletteTrigger = ({ label }: { label: string }) => {
  const [isMac, setIsMac] = useState(true);
  useEffect(() => setIsMac(isApplePlatform()), []);

  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_COMMAND_PALETTE_EVENT))}
      className="text-foreground-muted hover:text-foreground inline-flex w-fit items-center gap-2 font-mono text-xs whitespace-nowrap transition-colors"
    >
      <Command className="h-3.5 w-3.5" aria-hidden />
      {label}
      <span className="inline-flex items-center gap-0.5">
        <kbd className="border-border text-foreground-dim rounded border px-1.5 py-0.5 font-mono text-[10px] leading-none">
          {isMac ? "⌘" : "Ctrl"}
        </kbd>
        <kbd className="border-border text-foreground-dim rounded border px-1.5 py-0.5 font-mono text-[10px] leading-none">
          K
        </kbd>
      </span>
    </button>
  );
};
