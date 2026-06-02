import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Combines conditional classes and resolves Tailwind conflicts. */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

/** Returns the English translation if the locale is "en" and it exists; otherwise the base text (es). */
export const localized = (locale: string, base: string, en: string | undefined): string =>
  locale === "en" && en ? en : base;

/** Formats an ISO date range ("2024-01") into a locale-readable label. */
export const formatDateRange = (
  start: string,
  end: string | undefined,
  locale: string,
  currentLabel: string,
): string => {
  const fmt = (iso: string): string => {
    const [year, month] = iso.split("-");
    const date = new Date(Number(year), month ? Number(month) - 1 : 0);
    return date.toLocaleDateString(locale, { month: "short", year: "numeric" });
  };
  return `${fmt(start)} — ${end ? fmt(end) : currentLabel}`;
};
