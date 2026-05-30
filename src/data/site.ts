import type { SiteConfig } from "@/types";

const githubUsername = process.env.GITHUB_USERNAME ?? "Ricwolf19";

export const siteConfig: SiteConfig = {
  name: "Ricardo Tapia",
  title: "Ricardo Tapia — Desarrollador de Software Multiplataforma",
  description:
    "Diseño y construyo sistemas de software completos — ERP, SaaS, e-commerce y plataformas institucionales — de la arquitectura al deploy.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ricardotapia.dev",
  ogImage: "/opengraph-image",
  email: process.env.CONTACT_EMAIL ?? "rhtc19@gmail.com",
  whatsappNumber: process.env.WHATSAPP_NUMBER ?? "526143965716",
  locale: "es",
  socials: {
    github: `https://github.com/${githubUsername}`,
    linkedin: "https://www.linkedin.com/in/ricardo-tapia",
  },
};

export const githubUser = githubUsername;
