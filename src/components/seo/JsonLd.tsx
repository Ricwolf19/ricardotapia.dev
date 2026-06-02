import { siteConfig } from "@/data/site";

/** Person + WebSite JSON-LD structured data (spec §13.2). */
export const JsonLd = () => {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
      jobTitle: "Full-stack Developer",
      email: `mailto:${siteConfig.email}`,
      address: { "@type": "PostalAddress", addressCountry: "MX" },
      knowsAbout: ["Web Development", "Mobile Apps", "UI/UX Design", "Cloud Solutions"],
      sameAs: [siteConfig.socials.github, siteConfig.socials.x].filter(Boolean),
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
