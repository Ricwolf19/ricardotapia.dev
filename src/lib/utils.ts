import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Combines conditional classes and resolves Tailwind conflicts. */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

/** Returns the English translation if the locale is "en" and it exists; otherwise the base text (es). */
export const localized = (locale: string, base: string, en: string | undefined): string =>
  locale === "en" && en ? en : base;

/**
 * Formats an ISO date for display at the precision it was written: "2024-01"
 * becomes "ene 2024", a bare "2024" stays "2024". Inferring a month from a
 * year-only value would render a degree as "ene 2024 — ene 2026".
 */
export const formatMonthYear = (iso: string, locale: string): string => {
  const [year, month] = iso.split("-");
  if (!month) return year ?? iso;
  return new Date(Number(year), Number(month) - 1).toLocaleDateString(locale, {
    month: "short",
    year: "numeric",
  });
};

/** Formats an ISO date range ("2024-01") into a locale-readable label. */
export const formatDateRange = (
  start: string,
  end: string | undefined,
  locale: string,
  currentLabel: string,
): string =>
  `${formatMonthYear(start, locale)} — ${end ? formatMonthYear(end, locale) : currentLabel}`;
