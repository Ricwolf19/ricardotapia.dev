import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

/** Open Graph / Twitter card dimensions — the size every scraper crops to. */
export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

// Hex literals, not CSS vars: Satori resolves no cascade. Kept in sync with the
// dark theme tokens in src/styles/globals.css.
const BACKGROUND = "#0a0a0a";
const FOREGROUND = "#f8fafc";
const MUTED = "#cbd5e1";
const DIM = "#64748b";
const ACCENT = "#14D27A";

const PADDING = 80;
/** Usable text width once padding is removed — the basis for the fit estimates. */
const CONTENT_WIDTH = OG_SIZE.width - PADDING * 2;

/**
 * Satori has no text metrics to reflow against, so nothing here can rely on the
 * browser shrinking text to fit: overflow silently runs off the canvas. Both
 * helpers below estimate from character count instead, using ~0.5em as the mean
 * glyph width for this sans stack.
 */
export const charsPerLine = (fontSize: number): number =>
  Math.floor(CONTENT_WIDTH / (fontSize * 0.5));

/** Step the heading down so a long project title still fits in two lines. */
export const headingSize = (title: string): number => {
  if (title.length > 40) return 60;
  if (title.length > 24) return 80;
  return 108;
};

export const SUBTITLE_SIZE = 36;
export const SUBTITLE_MAX_LINES = 3;

/** Truncate on a word boundary; taglines are prose and vary wildly in length. */
export const truncate = (text: string, max: number): string => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
};

export interface OgCardProps {
  /** Small uppercase label above the title (section, category). Omit on the home card. */
  eyebrow?: string;
  title: string;
  /** One or two lines under the accent rule. Truncated to fit. */
  subtitle: string;
  /** Bottom-right line, dimmer — specialties or a tech list. */
  detail?: string;
}

/**
 * The site's single Open Graph card design. Laid out as three flex rows
 * (eyebrow / title block / footer) with `space-between` rather than absolute
 * positioning, so a long subtitle pushes the footer instead of colliding with
 * it. Every route's `opengraph-image.tsx` renders through here so the cards
 * stay identical.
 */
export const ogImageResponse = ({ eyebrow, title, subtitle, detail }: OgCardProps) =>
  new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: `${PADDING}px`,
        background: BACKGROUND,
        color: FOREGROUND,
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 24,
          color: ACCENT,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          height: 30,
        }}
      >
        {eyebrow ?? ""}
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: headingSize(title),
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
          }}
        >
          {title}
        </div>

        <div style={{ width: 160, height: 5, background: ACCENT, margin: "32px 0" }} />

        <div style={{ fontSize: SUBTITLE_SIZE, color: MUTED, fontWeight: 500, lineHeight: 1.3 }}>
          {truncate(subtitle, charsPerLine(SUBTITLE_SIZE) * SUBTITLE_MAX_LINES)}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 32,
        }}
      >
        <div style={{ fontSize: 26, color: ACCENT, fontWeight: 500 }}>
          {siteConfig.url.replace(/^https?:\/\//, "")}
        </div>
        {detail && (
          <div style={{ fontSize: 24, color: DIM, textAlign: "right" }}>
            {truncate(detail, charsPerLine(24))}
          </div>
        )}
      </div>
    </div>,
    { ...OG_SIZE },
  );
