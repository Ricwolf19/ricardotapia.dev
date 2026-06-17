import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const alt = "Ricardo Tapia — Full-stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Dynamic Open Graph / Twitter image (1200x630), generated with next/og.
 * Dark, minimalist layout: name on top, accent separator line, role and
 * specialties below, domain pinned to the corner. To change the wording, edit
 * the strings below; to recolor, edit the hex values (kept in sync with the
 * dark theme tokens in src/styles/globals.css).
 */
const Image = () =>
  new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "96px",
        background: "#0a0a0a",
        color: "#f8fafc",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 116, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1 }}>
        Ricardo Tapia
      </div>

      {/* Decorative separator — brand green accent */}
      <div style={{ width: 160, height: 5, background: "#14D27A", margin: "36px 0" }} />

      <div style={{ fontSize: 46, color: "#cbd5e1", fontWeight: 500 }}>Full-stack Developer</div>

      <div style={{ fontSize: 27, color: "#64748b", marginTop: 22, letterSpacing: "0.01em" }}>
        Web Development · Mobile Apps · UI/UX Design · Cloud Solutions
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 88,
          left: 96,
          fontSize: 27,
          color: "#14D27A",
          fontWeight: 500,
        }}
      >
        {siteConfig.url.replace(/^https?:\/\//, "")}
      </div>
    </div>,
    { ...size },
  );

export default Image;
