import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/data/site";
import { readAvatarDataUrl } from "@/lib/avatar";
import { ogImageResponse, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import es from "../../../messages/es.json";
import en from "../../../messages/en.json";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export const generateStaticParams = () => routing.locales.map((locale) => ({ locale }));

/**
 * Read the role straight from the message files: `generateImageMetadata` runs
 * while Next resolves a page's metadata, outside the request scope next-intl
 * needs, and a throw here drops EVERY meta tag on EVERY page.
 */
const messagesFor = (locale: string) => (locale === "en" ? en : es);
const role = (locale: string) => messagesFor(locale).home.intro.role;

/** Per-locale alt via generateImageMetadata; a static `alt` could not be localized. */
export const generateImageMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  return [{ id: "card", alt: `${siteConfig.name} — ${role(locale)}`, size, contentType }];
};

/**
 * Site-wide card for every page in a locale that does not render its own
 * (case studies do). Referenced explicitly by `defaultOgImage(locale)` in
 * lib/seo.ts, because declaring `openGraph` on a page drops the injected one.
 */
const Image = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();

  return ogImageResponse({
    eyebrow: messagesFor(locale).og.portfolio,
    title: siteConfig.name,
    subtitle: role(locale),
    detail: `${siteConfig.location.city}, ${siteConfig.location.countryName}`,
    avatar: await readAvatarDataUrl(),
  });
};

export default Image;
