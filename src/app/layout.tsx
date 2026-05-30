/**
 * Root layout passthrough. El documento <html> real se renderiza en
 * [locale]/layout.tsx; este nivel existe para que rutas fuera de locale
 * (p.ej. not-found global) tengan un root layout válido.
 */
const RootLayout = ({ children }: { children: React.ReactNode }) => children;

export default RootLayout;
