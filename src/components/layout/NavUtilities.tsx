import { useTranslations } from "next-intl";
import { siteConfig } from "@/data/site";
import { DocumentButton } from "@/components/sections/DocumentButton";
import { formatPhone } from "@/lib/utils";
import { CommandPaletteTrigger } from "./CommandPaletteTrigger";
import { CopyRow } from "./CopyRow";
import { ThemeToggle } from "./ThemeToggle";
import { LocaleSwitcher } from "./LocaleSwitcher";

const Group = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="flex flex-col gap-2">
    <h3 className="text-foreground-dim font-mono text-[10px] tracking-widest uppercase">{title}</h3>
    {children}
  </section>
);

const Divider = () => <div className="bg-border my-4 h-px" aria-hidden />;

/**
 * Everything a visitor copies or opens from the rail, in labelled groups:
 * search, documents, contact handles (click copies), settings.
 */
export const NavUtilities = () => {
  const t = useTranslations("nav");
  const tCv = useTranslations("cv");
  const github = siteConfig.socials.github;
  const githubHandle = `@${github.split("/").filter(Boolean).pop() ?? ""}`;
  const linkedin = siteConfig.socials.linkedin;
  const linkedinHandle = linkedin
    ? `/in/${linkedin.split("/in/")[1]?.replace(/\/$/, "") ?? ""}`
    : undefined;
  const phone = siteConfig.whatsappNumber ? formatPhone(siteConfig.whatsappNumber) : undefined;
  const site = siteConfig.url.replace(/^https?:\/\//, "");

  return (
    <div className="flex flex-col">
      <CommandPaletteTrigger label={t("commandPalette")} />

      <Divider />
      <Group title={t("groups.documents")}>
        <DocumentButton doc="cv" label={tCv("viewCv")} size="sm" className="w-fit" />
      </Group>

      <Divider />
      <Group title={t("groups.contact")}>
        <CopyRow
          label={t("email")}
          value={siteConfig.email}
          href={`mailto:${siteConfig.email}`}
          copiedLabel={t("copied")}
          openLabel={t("open")}
        />
        {phone && siteConfig.whatsappNumber && (
          <CopyRow
            label={t("phone")}
            value={phone}
            copyValue={`+${siteConfig.whatsappNumber}`}
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
            copiedLabel={t("copied")}
            openLabel={t("open")}
          />
        )}
        <CopyRow
          label={t("site")}
          value={site}
          copyValue={siteConfig.url}
          copiedLabel={t("copied")}
        />
      </Group>

      <Divider />
      <Group title={t("groups.social")}>
        <CopyRow
          label={t("github")}
          value={githubHandle}
          copyValue={github}
          href={github}
          copiedLabel={t("copied")}
          openLabel={t("open")}
        />
        {linkedin && linkedinHandle && (
          <CopyRow
            label={t("linkedin")}
            value={linkedinHandle}
            copyValue={linkedin}
            href={linkedin}
            copiedLabel={t("copied")}
            openLabel={t("open")}
          />
        )}
      </Group>

      <Divider />
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <LocaleSwitcher />
      </div>
    </div>
  );
};
