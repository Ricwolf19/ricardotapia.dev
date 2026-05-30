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
  // El widget de WhatsApp vive abajo-izquierda; mover el indicador de dev a la derecha.
  devIndicators: {
    buildActivityPosition: "bottom-right",
  },
};

export default withNextIntl(nextConfig);
