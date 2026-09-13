import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/layout/Section";
import { CredentialsGrid } from "@/components/sections/CredentialsGrid";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "certifications" });
  return pageMetadata(locale, "/certificaciones", {
    title: t("title"),
    description: t("subtitle"),
  });
};

const CertificationsPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "certifications" });

  return (
    <Section>
      <Breadcrumbs locale={locale} trail={[{ name: t("title"), path: "/certificaciones" }]} />
      <header className="mb-16 max-w-2xl">
        <h1 className="text-4xl tracking-tight">{t("title")}</h1>
        <p className="text-foreground-muted mt-4 text-lg leading-relaxed">{t("subtitle")}</p>
      </header>

      <CredentialsGrid />
    </Section>
  );
};

export default CertificationsPage;
