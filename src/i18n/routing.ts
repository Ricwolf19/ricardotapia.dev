import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "always",
  // Auto-detect the visitor's language from the browser's Accept-Language header
  // (and the NEXT_LOCALE cookie). Falls back to `defaultLocale` (es) when neither
  // matches a supported locale.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
