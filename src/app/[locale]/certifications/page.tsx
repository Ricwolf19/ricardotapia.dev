import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { earnedCredentials, upcomingCredentials } from "@/data/credentials";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
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
  return pageMetadata(locale, "/certifications", {
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
      <Breadcrumbs locale={locale} trail={[{ name: t("title"), path: "/certifications" }]} />
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <div className="space-y-16">
        <section aria-labelledby="credentials-earned">
          <h2 id="credentials-earned" className="text-2xl tracking-tight">
            {t("sections.earned.title")}
          </h2>
          <p className="text-foreground-muted mt-2 mb-6 text-sm">
            {t("sections.earned.description")}
          </p>
          <CredentialsGrid credentials={earnedCredentials} />
        </section>

        {upcomingCredentials.length > 0 && (
          <section aria-labelledby="credentials-upcoming">
            <h2 id="credentials-upcoming" className="text-2xl tracking-tight">
              {t("sections.upcoming.title")}
            </h2>
            <p className="text-foreground-muted mt-2 mb-6 text-sm">
              {t("sections.upcoming.description")}
            </p>
            <CredentialsGrid credentials={upcomingCredentials} />
          </section>
        )}
      </div>
    </Section>
  );
};

export default CertificationsPage;
