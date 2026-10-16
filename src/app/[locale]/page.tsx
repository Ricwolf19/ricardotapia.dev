import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/layout/Container";
import { Intro } from "@/components/sections/home/Intro";
import { ProjectsPreview } from "@/components/sections/home/ProjectsPreview";
import { ExperiencePreview } from "@/components/sections/home/ExperiencePreview";
import { StackPreview } from "@/components/sections/home/StackPreview";
import { CertificationsPreview } from "@/components/sections/home/CertificationsPreview";
import { ContactCta } from "@/components/sections/home/ContactCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { profilePageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  return pageMetadata(locale, "");
};

const HomePage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home.intro" });

  return (
    <Container>
      <JsonLd data={profilePageSchema(locale, siteConfig.name, t("bio"))} />
      <Intro />
      <ProjectsPreview />
      <ExperiencePreview />
      <StackPreview />
      <CertificationsPreview />
      <ContactCta />
    </Container>
  );
};

export default HomePage;
