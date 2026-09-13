import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

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
  // The WhatsApp widget sits bottom-left; move the dev indicator out of its way.
  devIndicators: {
    position: "bottom-right",
  },
};

export default withNextIntl(nextConfig);
