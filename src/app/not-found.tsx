import Link from "next/link";

/**
 * Not-found global. Como el <html> vive en [locale]/layout.tsx, este
 * fallback (fuera de cualquier locale) debe renderizar su propio documento.
 */
const NotFound = () => (
  <html lang="es" style={{ colorScheme: "dark" }}>
    <body
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        fontFamily: "ui-monospace, monospace",
        background: "#0a0a0f",
        color: "#f8fafc",
      }}
    >
      <h1 style={{ fontSize: "2rem", margin: 0 }}>404</h1>
      <p style={{ color: "#94a3b8" }}>Página no encontrada / Page not found</p>
      <Link href="/es" style={{ color: "#818cf8" }}>
        Inicio / Home
      </Link>
    </body>
  </html>
);

export default NotFound;
