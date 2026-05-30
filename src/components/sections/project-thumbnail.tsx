import Image from "next/image";
import type { Project } from "@/types";
import { categoryGradients } from "@/data/constants";
import { cn } from "@/lib/utils";

interface ProjectThumbnailProps {
  project: Project;
  className?: string;
  priority?: boolean;
  sizes?: string;
  /** Texto más pequeño para thumbnails reducidos (filas de lista). */
  compact?: boolean;
}

/**
 * Thumbnail de proyecto listo para imágenes reales.
 * - Si `project.thumbnailReady` es true: renderiza next/image (local o R2).
 * - Si no: placeholder programático con gradiente por categoría (spec §15.2).
 *
 * Para adjuntar una imagen real luego: coloca el archivo en
 * `public/images/projects/<slug>-thumb.jpg` (o una URL de R2 en `thumbnail`)
 * y marca `thumbnailReady: true` en `src/data/projects.ts`.
 */
export const ProjectThumbnail = ({
  project,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
  compact = false,
}: ProjectThumbnailProps) => {
  if (project.thumbnailReady) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br",
        categoryGradients[project.category],
        className,
      )}
    >
      {/* Textura sutil sobre el gradiente */}
      <div
        aria-hidden
        className="absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:16px_16px] opacity-[0.07]"
      />
      <span
        className={cn(
          "relative w-full px-2 text-center font-mono leading-tight font-medium [overflow-wrap:anywhere] break-words text-white drop-shadow-sm",
          compact ? "line-clamp-3 text-[0.7rem]" : "px-4 text-base sm:text-lg",
        )}
      >
        {project.title}
      </span>
    </div>
  );
};
