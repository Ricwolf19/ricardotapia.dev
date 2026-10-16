"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "next-themes";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";
import { useRouter, usePathname } from "@/i18n/routing";
import { navEntries } from "@/data/nav";
import { workProjects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { useOverlayLayer } from "@/components/overlay/overlayStack";
import { lockBodyScroll, unlockBodyScroll } from "@/components/overlay/scrollLock";
import { useFocusTrap } from "@/components/overlay/useFocusTrap";
import { useOverlayTransition } from "@/components/overlay/useOverlayTransition";
import { cn } from "@/lib/utils";
import { OPEN_COMMAND_PALETTE_EVENT } from "./command-palette-event";

type Item = { id: string; group: string; label: string; hint?: string; run: () => void };

/**
 * ⌘K / Ctrl+K command palette: jump to a page or a case study, switch theme or
 * language, copy the email. Keyboard-first: type to filter, ↑↓ to move, ⏎ to
 * run, Esc to close. `CommandPaletteTrigger` opens it from the sidebar.
 */
export const CommandPalette = () => {
  const t = useTranslations("palette");
  const tNav = useTranslations("nav");
  const tTheme = useTranslations("theme");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const { setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const { mounted, entered } = useOverlayTransition(open);
  const layer = useOverlayLayer(open);
  useFocusTrap(open, panelRef);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setCursor(0);
  }, []);

  const items = useMemo<Item[]>(() => {
    const go = (href: string) => () => {
      close();
      router.push(href);
    };
    const pages: Item[] = [
      { id: "home", group: t("groups.pages"), label: tNav("home"), run: go("/") },
      ...navEntries.map((e) => ({
        id: e.href,
        group: t("groups.pages"),
        label: tNav(e.key),
        run: go(e.href),
      })),
    ];
    const projects: Item[] = workProjects.map((p) => ({
      id: `project-${p.slug}`,
      group: t("groups.projects"),
      label: p.title,
      hint: p.category,
      run: go(`/projects/${p.slug}`),
    }));
    const actions: Item[] = [
      {
        id: "copy-email",
        group: t("groups.actions"),
        label: t("copyEmail"),
        hint: siteConfig.email,
        run: () => {
          void navigator.clipboard.writeText(siteConfig.email);
          close();
        },
      },
      ...(["light", "dark", "system"] as const).map((theme) => ({
        id: `theme-${theme}`,
        group: t("groups.actions"),
        label: `${tTheme("toggle")}: ${tTheme(theme)}`,
        run: () => {
          setTheme(theme);
          close();
        },
      })),
      {
        id: "locale",
        group: t("groups.actions"),
        label: t("switchLocale"),
        hint: locale === "es" ? "EN" : "ES",
        run: () => {
          close();
          // @ts-expect-error -- pathname is valid for the current routing config
          router.replace({ pathname, params }, { locale: locale === "es" ? "en" : "es" });
        },
      },
    ];
    return [...pages, ...projects, ...actions];
  }, [close, locale, pathname, params, router, t, tNav, tTheme, setTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) => i.label.toLowerCase().includes(q) || i.hint?.toLowerCase().includes(q),
    );
  }, [items, query]);

  // Global shortcut, plus the custom event the sidebar trigger dispatches.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_COMMAND_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_COMMAND_PALETTE_EVENT, onOpen);
    };
  }, []);

  // Open-state plumbing: Escape, scroll lock, keyboard navigation.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (!layer.isTopmost()) return;
        event.stopPropagation();
        close();
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        setCursor((c) => Math.min(c + 1, filtered.length - 1));
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setCursor((c) => Math.max(c - 1, 0));
      } else if (event.key === "Enter") {
        event.preventDefault();
        filtered[cursor]?.run();
      }
    };
    window.addEventListener("keydown", onKey, true);
    lockBodyScroll();
    return () => {
      window.removeEventListener("keydown", onKey, true);
      unlockBodyScroll();
    };
  }, [open, filtered, cursor, layer]);

  useEffect(() => setCursor(0), [query]);

  if (!mounted) return null;

  let lastGroup = "";
  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh] transition-opacity duration-200 motion-reduce:transition-none",
        entered ? "opacity-100" : "opacity-0",
      )}
    >
      <div className="bg-background/70 absolute inset-0 backdrop-blur-sm" onClick={close} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t("title")}
        tabIndex={-1}
        className={cn(
          "border-border bg-background relative w-full max-w-lg overflow-hidden rounded-xl border shadow-2xl transition-transform duration-200 motion-reduce:transition-none",
          entered ? "translate-y-0 scale-100" : "translate-y-2 scale-[0.98]",
        )}
      >
        <div className="border-border flex items-center gap-2 border-b px-4">
          <Search className="text-foreground-dim h-4 w-4 shrink-0" aria-hidden />
          <input
            data-autofocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("placeholder")}
            aria-label={t("title")}
            className="placeholder:text-foreground-dim h-12 w-full bg-transparent font-mono text-sm outline-none"
          />
          <kbd className="border-border text-foreground-dim rounded border px-1.5 py-0.5 font-mono text-[10px]">
            esc
          </kbd>
        </div>
        <ul role="listbox" className="max-h-[50vh] overflow-y-auto py-2">
          {filtered.length === 0 && (
            <li className="text-foreground-dim px-4 py-6 text-center font-mono text-sm">
              {t("empty")}
            </li>
          )}
          {filtered.map((item, i) => {
            const showGroup = item.group !== lastGroup;
            lastGroup = item.group;
            return (
              <li key={item.id} role="option" aria-selected={i === cursor}>
                {showGroup && (
                  <p className="text-foreground-dim px-4 pt-2 pb-1 font-mono text-[10px] tracking-widest uppercase">
                    {item.group}
                  </p>
                )}
                <button
                  type="button"
                  onMouseEnter={() => setCursor(i)}
                  onClick={item.run}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 px-4 py-2 text-left font-mono text-sm transition-colors",
                    i === cursor ? "bg-surface-elevated text-foreground" : "text-foreground-muted",
                  )}
                >
                  <span className="truncate">{item.label}</span>
                  <span className="flex shrink-0 items-center gap-2">
                    {item.hint && (
                      <span className="text-foreground-dim text-[11px]">{item.hint}</span>
                    )}
                    {i === cursor && <ArrowRight className="h-3.5 w-3.5" aria-hidden />}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>,
    document.body,
  );
};
