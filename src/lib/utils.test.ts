import { describe, it, expect } from "vitest";
import { localized, formatDateRange, formatMonthYear } from "@/lib/utils";

describe("localized", () => {
  const cases: { name: string; locale: string; en: string | undefined; expected: string }[] = [
    { name: "returns the English copy for en", locale: "en", en: "English", expected: "English" },
    {
      name: "falls back to Spanish when no translation exists",
      locale: "en",
      en: undefined,
      expected: "Base",
    },
    {
      name: "falls back when the translation is an empty string",
      locale: "en",
      en: "",
      expected: "Base",
    },
    { name: "ignores the English copy for es", locale: "es", en: "English", expected: "Base" },
  ];

  it.each(cases)("$name", ({ locale, en, expected }) => {
    expect(localized(locale, "Base", en)).toBe(expected);
  });
});

describe("formatDateRange", () => {
  it("uses the current label when there is no end date", () => {
    expect(formatDateRange("2025-05", undefined, "es", "Actual")).toContain("Actual");
  });

  it("renders both ends when the range is closed", () => {
    const result = formatDateRange("2022-01", "2024-06", "en", "Present");
    expect(result).not.toContain("Present");
    expect(result).toContain("—");
  });

  it("renders a year-only range without inventing months", () => {
    expect(formatDateRange("2024", "2026", "en", "Present")).toBe("2024 — 2026");
  });

  it("formats month names in the requested locale", () => {
    const es = formatDateRange("2025-01", "2025-02", "es", "Actual");
    const en = formatDateRange("2025-01", "2025-02", "en", "Present");
    expect(es).not.toBe(en);
  });
});

describe("formatMonthYear", () => {
  it("keeps a year-only value as a year", () => {
    // A degree written as "2024" must not render as "ene 2024" — inferring
    // January made the certifications page read "ene 2024 — ene 2026".
    expect(formatMonthYear("2024", "es")).toBe("2024");
    expect(formatMonthYear("2026", "en")).toBe("2026");
  });

  it("renders month and year when the month is given", () => {
    expect(formatMonthYear("2023-04", "en")).toMatch(/Apr.*2023/);
  });

  it("does not shift the year for January", () => {
    expect(formatMonthYear("2025-01", "en")).toContain("2025");
  });
});
