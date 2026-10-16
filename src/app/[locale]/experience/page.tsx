import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { EducationTimeline } from "@/components/sections/EducationTimeline";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "experience" });
  return pageMetadata(locale, "/experience", { title: t("title"), description: t("subtitle") });
};

const ExperiencePage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "experience" });

  return (
    <Section>
      <Breadcrumbs locale={locale} trail={[{ name: t("title"), path: "/experience" }]} />
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <ExperienceTimeline />

      <h2 className="mt-16 mb-8 text-2xl tracking-tight">{t("educationTitle")}</h2>
      <EducationTimeline />
    </Section>
  );
};

export default ExperiencePage;
