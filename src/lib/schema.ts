import { siteConfig } from "@/data/site";
import { education } from "@/data/education";
import { experiences } from "@/data/experience";
import { absoluteUrl, localeUrl } from "@/lib/seo";

/**
 * Stable `@id` anchors. Every schema on the site references the same Person and
 * WebSite nodes by `@id` instead of re-describing them, so Google merges them
 * into one entity across pages rather than treating each page's copy as a
 * separate thing. Changing these URIs resets that consolidation.
 */
export const PERSON_ID = absoluteUrl("/#person");
export const WEBSITE_ID = absoluteUrl("/#website");

const personRef = { "@id": PERSON_ID };

const jobTitle = (locale: string): string =>
  locale === "en"
    ? "Cross-Platform Software Developer"
    : "Desarrollador de Software Multiplataforma";

/** Schools deduped — two degrees from the same university is one `alumniOf`. */
const alumniOf = [...new Set(education.map((e) => e.school))].map((school) => ({
  "@type": "CollegeOrUniversity",
  name: school,
}));

const worksFor = experiences
  .filter((e) => e.isCurrent)
  .map((e) => ({
    "@type": "Organization",
    name: e.company,
    ...(e.companyUrl ? { url: e.companyUrl } : {}),
  }));

/** The site's root entity. Emitted once per page from the locale layout. */
export const personSchema = (locale: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: siteConfig.name,
  url: localeUrl(locale),
  mainEntityOfPage: localeUrl(locale),
  image: absoluteUrl("/apple-touch-icon.png"),
  jobTitle: jobTitle(locale),
  description,
  email: `mailto:${siteConfig.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Chihuahua", addressCountry: "MX" },
  nationality: { "@type": "Country", name: "México" },
  knowsAbout: siteConfig.keywords,
  knowsLanguage: ["es", "en"],
  alumniOf,
  ...(worksFor.length > 0 ? { worksFor } : {}),
  sameAs: [siteConfig.socials.github, siteConfig.socials.linkedin, siteConfig.socials.x].filter(
    Boolean,
  ),
});

export const websiteSchema = (locale: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: siteConfig.name,
  url: localeUrl(locale),
  description,
  inLanguage: locale,
  author: personRef,
  publisher: personRef,
  copyrightHolder: personRef,
});

/** `/about` — the canonical page *about* the Person, which is what ProfilePage means. */
export const profilePageSchema = (locale: string, name: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: localeUrl(locale, "/about"),
  name,
  description,
  inLanguage: locale,
  isPartOf: { "@id": WEBSITE_ID },
  mainEntity: personRef,
});

/** `/work` — the portfolio index, as an ordered list of the case-study URLs. */
export const collectionPageSchema = (
  locale: string,
  meta: { name: string; description: string; path: string },
  slugs: readonly string[],
) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  url: localeUrl(locale, meta.path),
  name: meta.name,
  description: meta.description,
  inLanguage: locale,
  isPartOf: { "@id": WEBSITE_ID },
  about: personRef,
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: slugs.length,
    itemListElement: slugs.map((slug, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: localeUrl(locale, `/work/${slug}`),
    })),
  },
});

/** One case study. */
export const creativeWorkSchema = (
  locale: string,
  work: {
    slug: string;
    title: string;
    description: string;
    keywords: string[];
    datePublished?: string;
    liveUrl?: string;
    repoUrl?: string;
  },
) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: work.title,
  headline: work.title,
  description: work.description,
  url: localeUrl(locale, `/work/${work.slug}`),
  inLanguage: locale,
  isPartOf: { "@id": WEBSITE_ID },
  ...(work.datePublished ? { datePublished: work.datePublished } : {}),
  keywords: work.keywords.join(", "),
  author: personRef,
  creator: personRef,
  ...(work.liveUrl ? { sameAs: work.liveUrl } : {}),
  ...(work.repoUrl ? { codeRepository: work.repoUrl } : {}),
});

export interface BreadcrumbItem {
  name: string;
  /** Locale-agnostic route ("", "/work", "/work/metri-info"). */
  path: string;
}

export const breadcrumbSchema = (locale: string, items: BreadcrumbItem[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: localeUrl(locale, c.path),
  })),
});
