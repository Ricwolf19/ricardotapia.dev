import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const alt = "Ricardo Tapia — Cross-Platform Software Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default Open Graph image, generated at the edge with next/og (spec §13.5). */
const Image = () =>
  new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "#0a0a0f",
        color: "#f8fafc",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 30,
          color: "#06b6d4",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        Cross-Platform Software Developer
      </div>
      <div style={{ fontSize: 128, fontWeight: 700, marginTop: 12, lineHeight: 1.05 }}>
        Ricardo Tapia
      </div>
      <div style={{ fontSize: 34, color: "#94a3b8", marginTop: 24 }}>
        ERP · SaaS · E-commerce · Platforms
      </div>
      <div style={{ position: "absolute", bottom: 72, left: 80, fontSize: 30, color: "#6366f1" }}>
        {siteConfig.url.replace("https://", "")}
      </div>
    </div>,
    { ...size },
  );

export default Image;
