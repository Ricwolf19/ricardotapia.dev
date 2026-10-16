import { promises as fs } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

/** Open Graph / Twitter card dimensions — the size every scraper crops to. */
export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

// Hex literals, not CSS vars: Satori resolves no cascade. Kept in sync with the
// dark theme tokens in src/styles/globals.css.
const BACKGROUND = "#0c0c0f";
const FOREGROUND = "#f4f4f5";
const MUTED = "#a1a1aa";
const DIM = "#71717a";
const BORDER = "#3f3f46";

const PADDING = 72;
/** Usable text width once padding is removed — the basis for the fit estimates. */
const CONTENT_WIDTH = OG_SIZE.width - PADDING * 2;

/** Mean glyph width as a fraction of the font size, per face. */
export const SANS_GLYPH = 0.52;
export const MONO_GLYPH = 0.6;

/**
 * Satori has no text metrics to reflow against, so nothing here can rely on the
 * browser shrinking text to fit: overflow silently runs off the canvas. The
 * helpers below estimate from character count instead.
 */
export const charsPerLine = (fontSize: number, glyph = SANS_GLYPH): number =>
  Math.floor(CONTENT_WIDTH / (fontSize * glyph));

/** Step the (mono) heading down so a long project title still fits in two lines. */
export const headingSize = (title: string): number => {
  if (title.length > 36) return 56;
  if (title.length > 22) return 76;
  return 100;
};

export const SUBTITLE_SIZE = 34;
export const SUBTITLE_MAX_LINES = 3;

/** Truncate on a word boundary; taglines are prose and vary wildly in length. */
export const truncate = (text: string, max: number): string => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
};

/**
 * Geist, vendored as TTF (OFL, see og-fonts/LICENSE.txt) because Satori cannot
 * read the woff2 next/font ships and must not depend on the network at build.
 * Read once per process.
 */
const FONT_DIR = path.join(process.cwd(), "src", "lib", "og-fonts");
type OgFonts = NonNullable<ConstructorParameters<typeof ImageResponse>[1]>["fonts"];
let fontsPromise: Promise<OgFonts> | undefined;

const loadFonts = () =>
  (fontsPromise ??= Promise.all([
    fs.readFile(path.join(FONT_DIR, "Geist-Regular.ttf")),
    fs.readFile(path.join(FONT_DIR, "GeistMono-Medium.ttf")),
  ]).then(([sans, mono]) => [
    { name: "Geist", data: sans, weight: 400 as const, style: "normal" as const },
    { name: "Geist Mono", data: mono, weight: 500 as const, style: "normal" as const },
  ]));

const SANS = "Geist, sans-serif";
const MONO = "'Geist Mono', monospace";

export interface OgCardProps {
  /** Small uppercase mono label above the title (section, category). */
  eyebrow?: string;
  title: string;
  /** One to three lines under the title. Truncated to fit. */
  subtitle: string;
  /** Up to five short chips in the footer (tech names); longer lists are cut. */
  chips?: string[];
  /** Bottom-right line when there are no chips (specialties, location). */
  detail?: string;
  /** Author photo as a data URL (see lib/avatar.ts). Shown as a large circle on the right. */
  avatar?: string;
}

const Chip = ({ children }: { children: string }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      height: 40,
      padding: "0 16px",
      border: `1.5px solid ${BORDER}`,
      borderRadius: 999,
      fontFamily: MONO,
      fontSize: 20,
      color: MUTED,
    }}
  >
    {children}
  </div>
);

/**
 * The site's single Open Graph card design: ink on near-black, Geist Mono
 * headings, an ink rule on the left. Three rows (eyebrow / title block /
 * footer) laid out with `space-between`, so a long subtitle pushes the footer
 * instead of colliding with it. Every route's `opengraph-image.tsx` renders
 * through here so the cards stay identical.
 */
export const ogImageResponse = async ({
  eyebrow,
  title,
  subtitle,
  chips,
  detail,
  avatar,
}: OgCardProps) => {
  const fonts = await loadFonts();
  // The avatar column narrows the text column; estimate fits against it.
  const textWidth = avatar ? CONTENT_WIDTH - 320 : CONTENT_WIDTH;
  const titleSize = headingSize(title);
  const subtitleChars = Math.floor(textWidth / (SUBTITLE_SIZE * SANS_GLYPH)) * SUBTITLE_MAX_LINES;

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        background: BACKGROUND,
        color: FOREGROUND,
        fontFamily: SANS,
        position: "relative",
      }}
    >
      {/* Ink rule along the left edge. */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: 10,
          background: FOREGROUND,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
          padding: `${PADDING}px ${PADDING}px ${PADDING}px ${PADDING + 10}px`,
        }}
      >
        <div
          style={{
            display: "flex",
            height: 28,
            fontFamily: MONO,
            fontSize: 20,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: DIM,
          }}
        >
          {eyebrow ?? ""}
        </div>

        <div style={{ display: "flex", flexDirection: "column", width: textWidth }}>
          <div
            style={{
              fontFamily: MONO,
              fontSize: titleSize,
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            {title}
          </div>
          <div style={{ width: 96, height: 4, background: FOREGROUND, margin: "28px 0" }} />
          <div style={{ fontSize: SUBTITLE_SIZE, color: MUTED, lineHeight: 1.35 }}>
            {truncate(subtitle, subtitleChars)}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 32,
          }}
        >
          <div style={{ fontFamily: MONO, fontSize: 24, color: FOREGROUND }}>
            {siteConfig.url.replace(/^https?:\/\//, "")}
          </div>
          {chips && chips.length > 0 ? (
            <div style={{ display: "flex", gap: 10 }}>
              {chips.slice(0, 5).map((chip) => (
                <Chip key={chip}>{chip}</Chip>
              ))}
            </div>
          ) : detail ? (
            <div style={{ fontFamily: MONO, fontSize: 20, color: DIM, textAlign: "right" }}>
              {truncate(detail, charsPerLine(20, MONO_GLYPH) - 30)}
            </div>
          ) : null}
        </div>
      </div>

      {avatar && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 320,
            paddingRight: PADDING,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori markup, not the DOM */}
          <img
            src={avatar}
            alt=""
            width={240}
            height={240}
            style={{ borderRadius: "50%", objectFit: "cover", border: `4px solid ${FOREGROUND}` }}
          />
        </div>
      )}
    </div>,
    { ...OG_SIZE, fonts },
  );
};
