import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { RecentProjects } from "@/components/sections/RecentProjects";

const HomePage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <RecentProjects />
    </>
  );
};

export default HomePage;
