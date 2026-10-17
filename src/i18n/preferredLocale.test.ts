import { describe, it, expect } from "vitest";
import { preferredLocale, DETECTION_FALLBACK } from "@/i18n/preferredLocale";

describe("preferredLocale", () => {
  const cases: { header: string | null; expected: string | undefined }[] = [
    { header: "en-US,en;q=0.9", expected: "en" },
    { header: "es-MX,es;q=0.9,en;q=0.8", expected: "es" },
    { header: "fr-FR,fr;q=0.9", expected: undefined },
    { header: "fr,en;q=0.5", expected: "en" },
    { header: "en;q=0.3,es", expected: "es" },
    { header: "*", expected: undefined },
    { header: "", expected: undefined },
    { header: null, expected: undefined },
    { header: "EN-gb", expected: "en" },
    { header: "de;q=0,en;q=0", expected: undefined },
  ];

  it.each(cases)("'$header' -> $expected", ({ header, expected }) => {
    expect(preferredLocale(header)).toBe(expected);
  });

  it("falls back to English, the most widely read language", () => {
    expect(DETECTION_FALLBACK).toBe("en");
  });
});
