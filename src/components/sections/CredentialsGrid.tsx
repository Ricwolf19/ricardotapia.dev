"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { credentials } from "@/data/credentials";
import type { Credential } from "@/types";
import { FileViewer } from "@/components/file-viewer/FileViewer";
import { useFileViewerLabels } from "@/components/file-viewer/useFileViewerLabels";
import { CredentialCard } from "@/components/sections/CredentialCard";

/**
 * Credential cards with the custom FileViewer: a PDF opens embedded, the
 * diploma opens as a 2-image gallery (arrows + counter).
 */
export const CredentialsGrid = () => {
  const t = useTranslations("certifications");
  const locale = useLocale();
  const labels = useFileViewerLabels();
  const [active, setActive] = useState<Credential | null>(null);

  return (
    <>
      <ul className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {credentials.map((credential) => (
          <CredentialCard
            key={credential.id}
            credential={credential}
            title={t(`items.${credential.id}.title`)}
            issuer={t(`items.${credential.id}.issuer`)}
            typeLabel={t(`type.${credential.docType}`)}
            currentLabel={t("current")}
            actionLabel={t("viewDocument")}
            locale={locale}
            onOpen={() => setActive(credential)}
          />
        ))}
      </ul>

      <FileViewer
        file={active?.files[0] ?? null}
        files={active?.files}
        onClose={() => setActive(null)}
        labels={labels}
      />
    </>
  );
};
