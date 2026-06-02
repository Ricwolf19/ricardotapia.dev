/**
 * Root layout passthrough. The actual <html> document is rendered in
 * [locale]/layout.tsx; this level exists so that routes outside a locale
 * (e.g. the global not-found) have a valid root layout.
 */
const RootLayout = ({ children }: { children: React.ReactNode }) => children;

export default RootLayout;
