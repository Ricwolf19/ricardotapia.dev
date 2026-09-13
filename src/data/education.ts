import type { Education } from "@/types";

/**
 * Formal education, ordered from most recent to oldest for direct rendering
 * in EducationTimeline. Spanish is the source of truth; English copy lives
 * in localize.ts.
 */
export const education: Education[] = [
  {
    id: "edu-utch-ing",
    school: "Universidad Tecnológica de Chihuahua",
    degree: "Ingeniería en Desarrollo y Gestión de Software",
    startDate: "2024",
    endDate: "2026",
    isCurrent: false,
  },
  {
    id: "edu-utch-tsu",
    school: "Universidad Tecnológica de Chihuahua",
    degree: "TSU en Tecnologías de la Información, área Desarrollo de Software Multiplataforma",
    startDate: "2022",
    endDate: "2024",
    isCurrent: false,
  },
];
