/**
 * Permanent (308) redirects for routes that were renamed. Kept as a plain array
 * so `next.config.ts` and `redirects.test.ts` read the same source without
 * loading the Next config (which pulls in the next-intl plugin under Vitest).
 */
export interface LegacyRedirect {
  source: string;
  destination: string;
  permanent: true;
}

const LOCALE = ":locale(es|en)";

export const legacyRedirects: LegacyRedirect[] = [
  // Locale-prefixed legacy URLs. `:path*` also matches the bare index.
  { source: `/${LOCALE}/work/:path*`, destination: "/:locale/projects/:path*", permanent: true },
  { source: `/${LOCALE}/certificaciones`, destination: "/:locale/certifications", permanent: true },
  { source: `/${LOCALE}/about`, destination: "/:locale/experience", permanent: true },
  // Unprefixed legacy URLs land on the default locale in one hop instead of
  // bouncing through next-intl's 307 first.
  { source: "/work/:path*", destination: "/es/projects/:path*", permanent: true },
  { source: "/certificaciones", destination: "/es/certifications", permanent: true },
  { source: "/about", destination: "/es/experience", permanent: true },
];
