import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/data/site";
import { defaultOgImage, localeUrl, ogAlternateLocale, ogLocale } from "@/lib/seo";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { AppShell } from "@/components/layout/AppShell";
import { WhatsAppWidget } from "@/components/layout/WhatsAppWidget";
import { JsonLd } from "@/components/seo/JsonLd";
import { personSchema, websiteSchema } from "@/lib/schema";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import "@/styles/globals.css";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const generateStaticParams = () => routing.locales.map((locale) => ({ locale }));

// Follows the OS like the default theme does; the hexes are the two `--background` tokens.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0c0f" },
  ],
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.intro" });
  const description = t("description");
  // Localized site title: siteConfig.title is the Spanish source of truth.
  const title = `${siteConfig.name} — ${t("role")}`;
  const image = defaultOgImage(locale);

  return {
    // metadataBase is inherited from the root layout (src/app/layout.tsx).
    title: { default: title, template: `%s | ${siteConfig.name}` },
    description,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: "technology",

    // Icons come from the file conventions src/app/icon.tsx and apple-icon.tsx
    // (generated from the author photo); the manifest from src/app/manifest.ts.
    manifest: "/manifest.webmanifest",

    // Indexing policy.
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    // Search Console ownership (set GOOGLE_SITE_VERIFICATION to enable).
    verification: process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : undefined,

    // Canonical + hreflang alternates are set per-page (see lib/seo.ts), so the
    // layout intentionally does not declare `alternates` — otherwise every page
    // would inherit it and self-canonicalize to the locale home.

    // Declaring `openGraph` here replaces the one Next builds from
    // [locale]/opengraph-image.tsx, so og:image has to be restated (see lib/seo.ts).
    // Pages override the whole object through `pageMetadata`.
    openGraph: {
      title,
      description,
      url: localeUrl(locale),
      siteName: siteConfig.name,
      locale: ogLocale(locale),
      alternateLocale: ogAlternateLocale(locale),
      type: "website",
      images: [image],
    },

    // Twitter Cards: restated in full for the same reason as Open Graph.
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(siteConfig.socials.x ? { creator: siteConfig.socials.x } : {}),
      images: [image.url],
    },
  };
};

const LocaleLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();

  setRequestLocale(locale);
  const tIntro = await getTranslations({ locale, namespace: "home.intro" });
  const description = tIntro("description");
  // Only the namespaces actually read by client components are sent to the
  // browser — server components resolve their own messages via `getTranslations`
  // and don't need the provider. Keep this list in sync with client `useTranslations`.
  const messages = await getMessages();
  const clientMessages = Object.fromEntries(
    (
      [
        "nav",
        "theme",
        "work",
        "contact",
        "status",
        "certifications",
        "fileViewer",
        "cv",
        "palette",
      ] as const
    )
      .filter((ns) => ns in messages)
      .map((ns) => [ns, messages[ns]]),
  ) as typeof messages;

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen">
        <JsonLd data={[personSchema(locale, description), websiteSchema(locale, description)]} />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider messages={clientMessages}>
            <AppShell>{children}</AppShell>
            <WhatsAppWidget />
          </NextIntlClientProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics />
      </body>
    </html>
  );
};

export default LocaleLayout;
