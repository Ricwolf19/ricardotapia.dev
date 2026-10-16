import type { Credential } from "@/types";

/**
 * Degrees, certificates and certifications shown on /certifications. Spanish
 * is the source of truth; English titles live in localize.ts. Files live in
 * public/credentials/. Adding a credential is one entry here: give it
 * `status: "planned"` or `"in-progress"` first, then flip to `"earned"` and
 * attach `files` once it exists.
 */
export const credentials: Credential[] = [
  {
    id: "ingenieria",
    title: "Ingeniería en Desarrollo y Gestión de Software",
    issuer: "Universidad Tecnológica de Chihuahua",
    docType: "degree",
    status: "earned",
    startDate: "2024",
    endDate: "2026",
    // TODO verifyUrl: QR target on proyecta.utch.edu.mx
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
    title: "TSU en Tecnologías de la Información, área Desarrollo de Software Multiplataforma",
    issuer: "Universidad Tecnológica de Chihuahua",
    docType: "degree",
    status: "earned",
    startDate: "2022",
    endDate: "2024",
    // TODO verifyUrl: QR target on proyecta.utch.edu.mx
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
    title: "Diplomado en Programación Full Stack (126 h)",
    issuer: "CENALTEC Chihuahua · Chihuahua IT Cluster",
    docType: "certificate",
    status: "earned",
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
  {
    id: "aws-saa",
    title: "AWS Certified Solutions Architect – Associate (SAA-C03)",
    issuer: "Amazon Web Services",
    docType: "certification",
    status: "planned",
    // targetDate omitted on purpose: the card renders "target TBD".
  },
];

export const earnedCredentials = credentials.filter((c) => c.status === "earned");

/** In progress first (the news), then planned. */
export const upcomingCredentials = [
  ...credentials.filter((c) => c.status === "in-progress"),
  ...credentials.filter((c) => c.status === "planned"),
];

/** Home preview: upcoming first, then earned, capped at four. */
export const credentialHighlights = [...upcomingCredentials, ...earnedCredentials].slice(0, 4);

export const getCredentialById = (id: string): Credential | undefined =>
  credentials.find((c) => c.id === id);
