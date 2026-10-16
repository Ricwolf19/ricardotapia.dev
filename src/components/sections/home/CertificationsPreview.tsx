import { getLocale, getTranslations } from "next-intl/server";
import { credentialHighlights } from "@/data/credentials";
import { getCredentialIssuer, getCredentialTitle } from "@/data/localize";
import { CredentialStatusBadge } from "@/components/sections/CredentialStatusBadge";
import { PreviewSection } from "./PreviewSection";

/** Text-only rows; the viewer lives on /certifications. */
export const CertificationsPreview = async () => {
  const t = await getTranslations("home");
  const locale = await getLocale();

  return (
    <PreviewSection
      index={4}
      label={t("sections.certifications")}
      title={t("previews.certifications.title")}
      href="/certifications"
      viewAllLabel={t("sections.viewAll")}
    >
      <ul className="divide-border divide-y">
        {credentialHighlights.map((c) => (
          <li key={c.id} className="flex items-start justify-between gap-4 py-3">
            <span className="min-w-0">
              <span className="block font-mono text-sm">{getCredentialTitle(c, locale)}</span>
              <span className="text-foreground-muted block text-xs">
                {getCredentialIssuer(c, locale)}
              </span>
            </span>
            <CredentialStatusBadge status={c.status} className="shrink-0" />
          </li>
        ))}
      </ul>
    </PreviewSection>
  );
};
