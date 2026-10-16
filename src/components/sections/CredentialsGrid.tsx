"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Credential } from "@/types";
import { getCredentialIssuer, getCredentialTitle } from "@/data/localize";
import { FileViewer } from "@/components/file-viewer/FileViewer";
import { useFileViewerLabels } from "@/components/file-viewer/useFileViewerLabels";
import { CredentialCard } from "@/components/sections/CredentialCard";

/**
 * Credential cards sharing one FileViewer: a PDF opens embedded, the diploma
 * opens as a 2-image gallery. Upcoming credentials have no files and no button.
 */
export const CredentialsGrid = ({ credentials }: { credentials: Credential[] }) => {
  const t = useTranslations("certifications");
  const locale = useLocale();
  const labels = useFileViewerLabels();
  const [active, setActive] = useState<Credential | null>(null);

  return (
    <>
      <ul className="stagger grid items-stretch gap-5 sm:grid-cols-2">
        {credentials.map((credential) => (
          <CredentialCard
            key={credential.id}
            credential={credential}
            title={getCredentialTitle(credential, locale)}
            issuer={getCredentialIssuer(credential, locale)}
            typeLabel={t(`type.${credential.docType}`)}
            currentLabel={t("current")}
            actionLabel={t("viewDocument")}
            verifyLabel={t("verify")}
            targetLabel={
              credential.status === "earned"
                ? undefined
                : credential.targetDate
                  ? t("target", { date: credential.targetDate })
                  : t("targetTbd")
            }
            locale={locale}
            onOpen={credential.files?.length ? () => setActive(credential) : undefined}
          />
        ))}
      </ul>

      <FileViewer
        file={active?.files?.[0] ?? null}
        files={active?.files}
        onClose={() => setActive(null)}
        labels={labels}
      />
    </>
  );
};
