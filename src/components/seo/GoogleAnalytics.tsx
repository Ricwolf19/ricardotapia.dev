import { GoogleAnalytics as GtagScript } from "@next/third-parties/google";

/**
 * GA4, gated on NEXT_PUBLIC_GA_ID. Without the env var this renders nothing, so
 * local and preview builds ship no gtag script at all — Vercel Analytics and
 * Speed Insights stay the only telemetry. Read at module scope because
 * `NEXT_PUBLIC_*` is inlined at build time, not resolved per request.
 */
const gaId = process.env.NEXT_PUBLIC_GA_ID;

export const GoogleAnalytics = () => (gaId ? <GtagScript gaId={gaId} /> : null);
