import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { legacyRedirects } from "./src/lib/redirects";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.r2.cloudflarestorage.com" },
      { protocol: "https", hostname: "assets.ricardotapia.dev" },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "react-icons"],
  },
  // Renamed routes keep their old URLs alive. Pinned by src/lib/redirects.test.ts.
  redirects: async () => legacyRedirects,
  // The WhatsApp widget sits bottom-right; keep the dev indicator on the other side.
  devIndicators: {
    position: "bottom-left",
  },
};

export default withNextIntl(nextConfig);
