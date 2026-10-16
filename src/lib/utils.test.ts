import { describe, it, expect } from "vitest";
import {
  localized,
  localizedList,
  formatDateRange,
  formatMonthYear,
  formatPhone,
} from "@/lib/utils";

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

describe("localizedList", () => {
  const base = ["a", "b"];

  it("returns the English list for en when it is complete", () => {
    expect(localizedList("en", base, ["x", "y"])).toEqual(["x", "y"]);
  });

  it("falls back to the base list when the translation is missing", () => {
    expect(localizedList("en", base, undefined)).toBe(base);
  });

  it("falls back when the translation has a different length", () => {
    // A half-translated list would silently drop or reorder bullets.
    expect(localizedList("en", base, ["x"])).toBe(base);
  });

  it("ignores the English list for es", () => {
    expect(localizedList("es", base, ["x", "y"])).toBe(base);
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

describe("formatPhone", () => {
  it("groups a Mexican number as +52 XXX XXX XXXX", () => {
    expect(formatPhone("526143965716")).toBe("+52 614 396 5716");
  });

  it("falls back to a plain plus-prefixed number elsewhere", () => {
    expect(formatPhone("14155550123")).toBe("+14155550123");
  });
});
