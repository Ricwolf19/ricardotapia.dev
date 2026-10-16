import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { workProjects, projectSlugs } from "@/data/projects";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import { collectionPageSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "work" });
  return pageMetadata(locale, "/projects", { title: t("title"), description: t("subtitle") });
};

const WorkPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "work" });

  return (
    <Section wide>
      <JsonLd
        data={collectionPageSchema(
          locale,
          { name: t("title"), description: t("subtitle"), path: "/projects" },
          projectSlugs,
        )}
      />
      <Breadcrumbs locale={locale} trail={[{ name: t("title"), path: "/projects" }]} />
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <ProjectGrid projects={workProjects} />
    </Section>
  );
};

export default WorkPage;
