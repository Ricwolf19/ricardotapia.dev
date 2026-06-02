import { siteConfig } from "@/data/site";

/** Person + WebSite JSON-LD structured data (spec §13.2). */
export const JsonLd = () => {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
      jobTitle: "Software Developer",
      email: `mailto:${siteConfig.email}`,
      sameAs: [siteConfig.socials.github],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  ];

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
};
