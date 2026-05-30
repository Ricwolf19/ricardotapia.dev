import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Section } from "@/components/layout/Section";
import { ContactForm } from "@/components/sections/ContactForm";
import { siteConfig } from "@/data/site";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title"), description: t("subtitle") };
};

const ContactPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });

  const whatsappHref = siteConfig.whatsappNumber
    ? `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("Hola Ricardo, me interesa hablar sobre un proyecto.")}`
    : undefined;

  return (
    <Section>
      <header className="mb-10 max-w-2xl">
        <h1 className="text-4xl tracking-tight">{t("title")}</h1>
        <p className="text-foreground-muted mt-3 text-lg">{t("subtitle")}</p>
      </header>

      <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
        <ContactForm email={siteConfig.email} />

        {/* Canales directos */}
        <aside className="space-y-4">
          {whatsappHref && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group border-border bg-surface flex items-center gap-4 rounded-lg border p-5 transition-all hover:-translate-y-0.5 hover:border-[#25D366]/50 hover:shadow-lg hover:shadow-[#25D366]/5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] transition-colors group-hover:bg-[#25D366] group-hover:text-white">
                <FaWhatsapp className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-mono text-sm font-medium">{t("whatsapp.label")}</span>
                <span className="text-foreground-muted block text-xs">{t("whatsapp.cta")}</span>
              </span>
            </a>
          )}

          <a
            href={`mailto:${siteConfig.email}`}
            className="group border-border bg-surface hover:border-accent/50 hover:shadow-accent/5 flex items-center gap-4 rounded-lg border p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <span className="bg-accent/10 text-accent group-hover:bg-accent flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors group-hover:text-white">
              <Mail className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block font-mono text-sm font-medium">{t("directEmail")}</span>
              <span className="text-accent block truncate text-xs">{siteConfig.email}</span>
            </span>
          </a>
        </aside>
      </div>
    </Section>
  );
};

export default ContactPage;
