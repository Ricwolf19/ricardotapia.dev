import type { SiteConfig } from "@/types";

const githubUsername = process.env.GITHUB_USERNAME ?? "Ricwolf19";

export const siteConfig: SiteConfig = {
  name: "Ricardo Tapia",
  title: "Ricardo Tapia — Desarrollador de Software Multiplataforma",
  description:
    "Diseño y construyo sistemas de software completos — ERP, SaaS, e-commerce y plataformas institucionales — de la arquitectura al deploy.",
  // Canonical domain: the apex, which is Vercel's primary domain here (www 308s to it).
  // Pointing canonicals/hreflang at www would aim every signal at a redirect.
  // Override per-environment with NEXT_PUBLIC_SITE_URL.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ricardotapia.dev",
  ogImage: "/opengraph-image",
  email: process.env.CONTACT_EMAIL ?? "rhtc19@gmail.com",
  whatsappNumber: process.env.WHATSAPP_NUMBER ?? "526143965716",
  locale: "es",
  keywords: [
    "Ricardo Tapia",
    "Full-stack Developer",
    "Desarrollador full-stack",
    "Desarrollador de software",
    "Web Development",
    "Mobile Apps",
    "React Native",
    "Expo",
    "Progressive Web Apps",
    "PWA",
    "SEO",
    "UI/UX Design",
    "Cloud Solutions",
    "Next.js",
    "React",
    "TypeScript",
    "Open Source",
    "Chihuahua",
    "México",
  ],
  socials: {
    github: `https://github.com/${githubUsername}`,
    linkedin: "https://www.linkedin.com/in/ricardo-tapia-dev/",
    // Optional X/Twitter handle for twitter:creator (e.g. "@ricardotapia").
    x: process.env.TWITTER_HANDLE,
  },
};

export const githubUser = githubUsername;
