import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { nowProjects } from "@/data/projects";
import { Section } from "@/components/layout/Section";
import { ProjectCard } from "@/components/sections/ProjectCard";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "now" });
  return { title: t("title"), description: t("subtitle") };
};

const NowPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "now" });

  return (
    <Section>
      <header className="mb-10 max-w-2xl">
        <h1 className="text-4xl tracking-tight">{t("title")}</h1>
        <p className="text-foreground-muted mt-3">{t("subtitle")}</p>
      </header>

      {nowProjects.length === 0 ? (
        <p className="text-foreground-muted py-12 text-center">{t("empty")}</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {nowProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </Section>
  );
};

export default NowPage;
