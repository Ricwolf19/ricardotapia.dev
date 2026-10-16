import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/sections/ContactForm";
import { ContactComposer } from "@/components/sections/ContactComposer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { siteConfig } from "@/data/site";
import { features } from "@/lib/env";
import { pageMetadata } from "@/lib/seo";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return pageMetadata(locale, "/contact", { title: t("title"), description: t("subtitle") });
};

const ContactPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });

  const whatsappHref = siteConfig.whatsappNumber
    ? `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(t("whatsapp.prefill"))}`
    : undefined;

  return (
    <Section>
      <Breadcrumbs locale={locale} trail={[{ name: t("title"), path: "/contact" }]} />
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
        {features.resend ? (
          <ContactForm
            email={siteConfig.email}
            live
            recaptchaSiteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          />
        ) : (
          <ContactComposer email={siteConfig.email} whatsappNumber={siteConfig.whatsappNumber} />
        )}

        {/* Direct channels */}
        <aside className="space-y-4">
          {whatsappHref && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group border-border bg-surface lift flex items-center gap-4 rounded-lg border p-5"
            >
              <span className="border-border text-foreground group-hover:bg-foreground group-hover:text-background flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors">
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
            className="group border-border bg-surface lift flex items-center gap-4 rounded-lg border p-5"
          >
            <span className="border-border text-foreground group-hover:bg-foreground group-hover:text-background flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors">
              <Mail className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block font-mono text-sm font-medium">{t("directEmail")}</span>
              <span className="text-foreground-muted block truncate text-xs">
                {siteConfig.email}
              </span>
            </span>
          </a>
        </aside>
      </div>
    </Section>
  );
};

export default ContactPage;
