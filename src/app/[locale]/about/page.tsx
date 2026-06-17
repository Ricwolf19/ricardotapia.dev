import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/layout/Section";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { TechStack } from "@/components/sections/TechStack";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return pageMetadata(locale, "/about", { title: t("title"), description: t("bio") });
};

const AboutPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <Section>
      <Breadcrumbs locale={locale} trail={[{ name: t("title"), path: "/about" }]} />
      <header className="max-w-2xl">
        <h1 className="text-4xl tracking-tight">{t("title")}</h1>
        <p className="text-foreground-muted mt-4 text-lg leading-relaxed">{t("bio")}</p>
      </header>

      <div className="mt-16 space-y-16">
        <div>
          <h2 className="mb-8 text-2xl tracking-tight">{t("experienceTitle")}</h2>
          <ExperienceTimeline />
        </div>

        <div>
          <h2 className="mb-8 text-2xl tracking-tight">{t("stackTitle")}</h2>
          <TechStack />
        </div>

        {/* GitHubStats → Phase 3 */}
      </div>
    </Section>
  );
};

export default AboutPage;
