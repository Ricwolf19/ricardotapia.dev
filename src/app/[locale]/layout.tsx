import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Inter, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/data/site";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppWidget } from "@/components/layout/WhatsAppWidget";
import { JsonLd } from "@/components/seo/JsonLd";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const generateStaticParams = () => routing.locales.map((locale) => ({ locale }));

export const viewport: Viewport = { themeColor: "#0a0a0f" };

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.hero" });
  const description = t("description");

  // OG locales (full BCP-47 region codes for richer previews).
  const ogLocale = locale === "es" ? "es_MX" : "en_US";
  const ogAlternate = locale === "es" ? "en_US" : "es_MX";

  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: siteConfig.title, template: `%s | ${siteConfig.name}` },
    description,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: "technology",

    // Favicon, icons and PWA manifest (files live in public/).
    manifest: "/site.webmanifest",
    icons: {
      icon: [
        // SVG mark first — modern browsers prefer it and it adapts to light/dark.
        { url: "/logo.svg", type: "image/svg+xml" },
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
        { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },

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

    // Open Graph (og:image comes from app/opengraph-image.tsx automatically).
    openGraph: {
      title: siteConfig.title,
      description,
      url: `${siteConfig.url}/${locale}`,
      siteName: siteConfig.name,
      locale: ogLocale,
      alternateLocale: ogAlternate,
      type: "website",
    },

    // Twitter Cards (twitter:image comes from app/twitter-image.tsx automatically).
    twitter: {
      card: "summary_large_image",
      title: siteConfig.title,
      description,
      creator: siteConfig.socials.x,
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
  // Only the namespaces actually read by client components are sent to the
  // browser — server components resolve their own messages via `getTranslations`
  // and don't need the provider. Keep this list in sync with client `useTranslations`.
  const messages = await getMessages();
  const clientMessages = Object.fromEntries(
    (["nav", "theme", "work", "contact", "status"] as const)
      .filter((ns) => ns in messages)
      .map((ns) => [ns, messages[ns]]),
  ) as typeof messages;

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen">
        <JsonLd />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <NextIntlClientProvider messages={clientMessages}>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <WhatsAppWidget />
          </NextIntlClientProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default LocaleLayout;
