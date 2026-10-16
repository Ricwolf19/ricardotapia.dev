"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/data/site";

/** Always 24-hour, locale-independent digits, so the width never changes. */
const formatNow = () =>
  new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: siteConfig.location.timeZone,
  }).format(new Date());

/**
 * Live local time where the author is, ticking every 30 s. One line, fixed
 * slots: dot · HH:MM · label. Renders "--:--" until mounted so nothing shifts.
 */
export const LocalTime = ({ label }: { label: string }) => {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const tick = () => setTime(formatNow());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="text-foreground-dim flex items-center gap-2 font-mono text-[11px] whitespace-nowrap">
      <span className="bg-success inline-block h-1.5 w-1.5 shrink-0 rounded-full" aria-hidden />
      <span
        className="text-foreground-muted w-[5ch] shrink-0 tabular-nums"
        suppressHydrationWarning
      >
        {time}
      </span>
      <span className="truncate">{label}</span>
    </span>
  );
};
