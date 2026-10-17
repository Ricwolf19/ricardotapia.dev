import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "always",
  // Unprefixed URLs redirect to the visitor's language: the NEXT_LOCALE cookie
  // (set when they switch) first, then the browser's Accept-Language; with no
  // supported language, src/middleware.ts falls back to `en`, not `es`.
  // Indexed URLs are always prefixed, so crawlers and hreflang are unaffected.
  // Pinned by src/i18n/routing.test.ts — this flag once lied in a comment.
  localeDetection: true,
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
