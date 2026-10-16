import Link from "next/link";
import { Geist_Mono } from "next/font/google";
import { siteConfig } from "@/data/site";

const geistMono = Geist_Mono({ subsets: ["latin"], weight: ["500"], display: "swap" });

/**
 * Global not-found. The <html> lives in [locale]/layout.tsx, so this fallback
 * (outside any locale) renders its own document: no messages, no theme
 * provider. It follows the OS scheme with the same ink/paper tokens as
 * globals.css, and offers both locales since none is known here.
 */
const NotFound = () => (
  <html lang="es" className={geistMono.className}>
    <head>
      <title>404 — {siteConfig.name}</title>
      <meta name="robots" content="noindex" />
      <style>{`
        :root { color-scheme: light dark; --bg: #ffffff; --ink: #0a0a0a; --muted: #52525b; --border: #e4e4e7; }
        @media (prefers-color-scheme: dark) { :root { --bg: #0c0c0f; --ink: #f4f4f5; --muted: #a1a1aa; --border: #27272a; } }
        body { margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--bg); color: var(--ink); -webkit-font-smoothing: antialiased; }
        main { padding: 0 1.5rem; max-width: 36rem; }
        .code { font-size: 0.75rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); margin: 0; }
        h1 { font-size: clamp(2.5rem, 8vw, 4.5rem); line-height: 1; letter-spacing: -0.03em; margin: 0.5rem 0 1rem; font-weight: 500; }
        p { color: var(--muted); margin: 0; font-size: 0.95rem; line-height: 1.6; }
        nav { display: flex; gap: 0.75rem; margin-top: 2rem; flex-wrap: wrap; }
        a { display: inline-flex; align-items: center; height: 2.5rem; padding: 0 1.25rem; border-radius: 999px; border: 1px solid var(--ink); color: var(--ink); text-decoration: none; font-size: 0.875rem; transition: transform 200ms ease, background 200ms ease, color 200ms ease; }
        a:hover { transform: translateY(-2px); }
        a.primary { background: var(--ink); color: var(--bg); }
        .rule { width: 6rem; height: 4px; background: var(--ink); margin: 0 0 1.25rem; }
      `}</style>
    </head>
    <body>
      <main>
        <p className="code">404</p>
        <h1>Página no encontrada</h1>
        <div className="rule" />
        <p>La ruta no existe o cambió de lugar. · This page does not exist or has moved.</p>
        <nav aria-label="Inicio / Home">
          <Link href="/es" className="primary">
            Inicio
          </Link>
          <Link href="/en">Home</Link>
        </nav>
      </main>
    </body>
  </html>
);

export default NotFound;
