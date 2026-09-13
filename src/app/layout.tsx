import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

/**
 * `metadataBase` lives here, not in [locale]/layout.tsx, so that routes *outside*
 * a locale — the global not-found, the root opengraph-image/twitter-image — also
 * resolve relative OG/canonical URLs against the real domain instead of
 * falling back to localhost:3000. Deeper segments inherit it.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
};

/**
 * Root layout passthrough. The actual <html> document is rendered in
 * [locale]/layout.tsx; this level exists so that routes outside a locale
 * (e.g. the global not-found) have a valid root layout.
 */
const RootLayout = ({ children }: { children: React.ReactNode }) => children;

export default RootLayout;
