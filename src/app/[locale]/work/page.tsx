import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { workProjects } from "@/data/projects";
import { Section } from "@/components/layout/section";
import { ProjectGrid } from "@/components/sections/project-grid";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "work" });
  return { title: t("title"), description: t("subtitle") };
};

const WorkPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "work" });

  return (
    <Section>
      <header className="mb-10">
        <h1 className="text-4xl tracking-tight">{t("title")}</h1>
        <p className="text-foreground-muted mt-3 max-w-2xl">{t("subtitle")}</p>
      </header>
      <ProjectGrid projects={workProjects} />
    </Section>
  );
};

export default WorkPage;
