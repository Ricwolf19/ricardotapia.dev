import Image from "next/image";
import type { Project } from "@/types";
import { categoryGradients } from "@/data/constants";
import { cn } from "@/lib/utils";

interface ProjectThumbnailProps {
  project: Project;
  className?: string;
  priority?: boolean;
  sizes?: string;
  /** Smaller text for reduced thumbnails (list rows). */
  compact?: boolean;
}

/**
 * Project thumbnail, ready for real images.
 * - If `project.thumbnailReady` is true: renders next/image (local or R2).
 * - Otherwise: a programmatic placeholder with a per-category gradient (spec §15.2).
 *
 * To attach a real image later: place the file at
 * `public/images/projects/<slug>-thumb.jpg` (or an R2 URL in `thumbnail`)
 * and set `thumbnailReady: true` in `src/data/projects.ts`.
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
      {/* Subtle texture over the gradient */}
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
