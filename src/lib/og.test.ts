import { describe, it, expect } from "vitest";
import { truncate, headingSize, charsPerLine, SUBTITLE_SIZE, SUBTITLE_MAX_LINES } from "@/lib/og";

/**
 * Satori silently draws past the canvas edge instead of wrapping or shrinking,
 * so a tagline that is merely "a bit long" is invisible in the build and broken
 * in the shared preview. These clamps are the only thing preventing that.
 */
describe("truncate", () => {
  it("leaves text that already fits untouched", () => {
    expect(truncate("short", 20)).toBe("short");
  });

  it("returns text of exactly the limit untouched (boundary)", () => {
    expect(truncate("abcde", 5)).toBe("abcde");
  });

  it("cuts on a word boundary and marks the cut", () => {
    const result = truncate("the quick brown fox jumps", 16);
    expect(result.endsWith("…")).toBe(true);
    expect(result).not.toContain("fo…");
  });

  it("hard-cuts when a single word is longer than the limit", () => {
    // No space to break on, so it must still be bounded rather than overflow.
    const result = truncate("supercalifragilistic", 10);
    expect(result).toBe("supercalif…");
  });

  it("never leaves a space before the ellipsis", () => {
    expect(truncate("hello world again", 12)).not.toContain(" …");
  });
});

describe("headingSize", () => {
  it("shrinks monotonically as the title grows", () => {
    const short = headingSize("Metri");
    const medium = headingSize("Corporativo Fiscal Nacional");
    const long = headingSize("A Very Long Project Title That Keeps Going On");
    expect(short).toBeGreaterThan(medium);
    expect(medium).toBeGreaterThan(long);
  });

  it("keeps every real project title within two rendered lines", () => {
    const titles = ["Metri", "Corporativo Fiscal", "Agates From Mexico", "Facturalandia"];
    for (const title of titles) {
      const size = headingSize(title);
      expect(title.length).toBeLessThanOrEqual(charsPerLine(size) * 2);
    }
  });
});

describe("charsPerLine", () => {
  it("allows fewer characters as the font grows", () => {
    expect(charsPerLine(24)).toBeGreaterThan(charsPerLine(SUBTITLE_SIZE));
    expect(charsPerLine(SUBTITLE_SIZE)).toBeGreaterThan(charsPerLine(108));
  });

  it("bounds the subtitle to its configured line budget", () => {
    const budget = charsPerLine(SUBTITLE_SIZE) * SUBTITLE_MAX_LINES;
    const tagline =
      "Plataforma operativa interna de un despacho fiscal: 13 apps, expediente digital cifrado, 2FA y pizarra colaborativa en tiempo real, con auditoría completa.";
    expect(truncate(tagline, budget).length).toBeLessThanOrEqual(budget + 1);
  });
});
