/**
 * Site navigation, grouped the way the sidebar and the mobile overlay draw it.
 * `href` is locale-agnostic (the i18n Link prefixes it); `key` is the `nav.*`
 * message. Adding a route: add it here, to STATIC_PATHS in app/sitemap.ts, and
 * (when renaming) to lib/redirects.ts — the tests cross-check all three.
 */
export const siteNav = {
  primary: [
    { href: "/projects", key: "projects" },
    { href: "/experience", key: "experience" },
    { href: "/stack", key: "stack" },
    { href: "/certifications", key: "certifications" },
  ],
  secondary: [
    { href: "/now", key: "now" },
    { href: "/contact", key: "contact" },
  ],
} as const;

export type NavGroup = keyof typeof siteNav;
export type NavEntry = (typeof siteNav)[NavGroup][number];
export const navEntries: readonly NavEntry[] = [...siteNav.primary, ...siteNav.secondary];
