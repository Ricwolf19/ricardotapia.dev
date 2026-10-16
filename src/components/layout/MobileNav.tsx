"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { useOverlayLayer } from "@/components/overlay/overlayStack";
import { lockBodyScroll, unlockBodyScroll } from "@/components/overlay/scrollLock";
import { useFocusTrap } from "@/components/overlay/useFocusTrap";
import { useOverlayTransition } from "@/components/overlay/useOverlayTransition";
import { cn } from "@/lib/utils";
import { NavList } from "./NavList";
import { NavUtilities } from "./NavUtilities";
import { APP_SHELL_ID, WHATSAPP_WIDGET_ID } from "./shell-ids";

/** Tailwind `lg`; the sidebar takes over at this width. */
const DESKTOP_QUERY = "(min-width: 64rem)";
/** Elements made inert while the overlay is open (the overlay itself is portaled). */
const INERT_IDS = [APP_SHELL_ID, WHATSAPP_WIDGET_ID];

/**
 * Mobile (<lg) chrome: a sticky top bar and a full-screen navigation overlay.
 * The overlay is a real dialog — focus-trapped, scroll-locked, Escape closes
 * it, the page behind is inert — and it closes itself on navigation and when
 * the viewport grows into the sidebar breakpoint.
 */
export const MobileNav = () => {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const { mounted, entered } = useOverlayTransition(open);
  const layer = useOverlayLayer(open);
  useFocusTrap(open, panelRef);

  const close = () => setOpen(false);

  // Route change closes it.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !layer.isTopmost()) return;
      event.stopPropagation();
      setOpen(false);
    };
    // Capture phase: it must run BEFORE any bubble-phase dialog handler.
    window.addEventListener("keydown", onKey, true);
    lockBodyScroll();

    // A rotated tablet must not keep a hidden overlay holding the scroll lock.
    const media = window.matchMedia(DESKTOP_QUERY);
    const onMedia = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    media.addEventListener("change", onMedia);

    const inerted = INERT_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    for (const el of inerted) el.setAttribute("inert", "");

    return () => {
      window.removeEventListener("keydown", onKey, true);
      media.removeEventListener("change", onMedia);
      for (const el of inerted) el.removeAttribute("inert");
      unlockBodyScroll();
    };
  }, [open, layer]);

  return (
    <>
      <header className="border-border bg-background/90 sticky top-0 z-50 flex h-14 items-center justify-between border-b px-6 backdrop-blur lg:hidden">
        <Link href="/" className="font-mono text-sm font-medium">
          {siteConfig.name}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          aria-label={open ? t("closeMenu") : t("openMenu")}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </header>

      {mounted &&
        createPortal(
          <div
            id="mobile-nav"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-nav-title"
            tabIndex={-1}
            className={cn(
              "bg-background fixed inset-0 z-[60] flex flex-col overflow-y-auto transition-opacity duration-200 motion-reduce:transition-none lg:hidden",
              entered ? "opacity-100" : "opacity-0",
            )}
          >
            <div className="border-border flex h-14 items-center justify-between border-b px-6">
              <h2 id="mobile-nav-title" className="font-mono text-sm font-medium">
                {siteConfig.name}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                aria-label={t("closeMenu")}
                data-autofocus
                onClick={close}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex flex-1 flex-col px-7 py-8">
              <NavList variant="overlay" includeHome entered={entered} onNavigate={close} />
              <div
                className={cn(
                  "mt-8 transition-[opacity,translate] duration-300 ease-out motion-reduce:transition-none",
                  entered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                )}
                style={{ transitionDelay: "140ms" }}
              >
                <NavUtilities />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};
