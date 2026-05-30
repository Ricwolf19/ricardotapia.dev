import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Combina clases condicionales y resuelve conflictos de Tailwind. */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

/** Devuelve la traducción inglesa si el locale es "en" y existe; si no, el texto base (es). */
export const localized = (locale: string, base: string, en: string | undefined): string =>
  locale === "en" && en ? en : base;

/** Formatea un rango de fechas ISO ("2024-01") a etiqueta legible por locale. */
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
