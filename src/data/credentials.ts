import type { Credential } from "@/types";

/**
 * Verifiable credentials (degrees & certificates) shown in /certificaciones.
 * Titles and issuers are localized via messages (`certifications.items.<id>`);
 * here only the document files and dates. Files live in public/credentials/.
 */

export const credentials: Credential[] = [
  {
    id: "ingenieria",
    docType: "degree",
    startDate: "2024",
    endDate: "2026",
    files: [
      {
        url: "/credentials/titulo-ingenieria.pdf",
        fileName: "titulo-ingenieria.pdf",
        mimeType: "application/pdf",
      },
    ],
  },
  {
    id: "tsu",
    docType: "degree",
    startDate: "2022",
    endDate: "2024",
    files: [
      {
        url: "/credentials/titulo-tsu.pdf",
        fileName: "titulo-tsu.pdf",
        mimeType: "application/pdf",
      },
    ],
  },
  {
    id: "fullstack",
    docType: "certificate",
    issuedDate: "2023-04",
    files: [
      {
        url: "/credentials/full-stack-foundations.jpeg",
        fileName: "full-stack-foundations.jpeg",
        mimeType: "image/jpeg",
      },
      {
        url: "/credentials/full-stack-agradecimiento.jpeg",
        fileName: "full-stack-agradecimiento.jpeg",
        mimeType: "image/jpeg",
      },
    ],
  },
];
