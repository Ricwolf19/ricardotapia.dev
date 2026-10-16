import Image from "next/image";
import type { Project } from "@/types";
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
 * - Otherwise: a programmatic monochrome placeholder (halftone + title).
 *
 * To attach a real image: place it at `public/images/projects/<slug>/cover.{jpg,png}`
 * (or an R2 URL in `thumbnail`) and set `thumbnailReady: true` in
 * `src/data/projects.ts`. A test fails if the flag is set without the file.
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
        "bg-surface-elevated relative flex items-center justify-center overflow-hidden",
        className,
      )}
    >
      <div aria-hidden className="halftone absolute inset-0" />
      <span
        className={cn(
          "bg-background/80 text-foreground relative max-w-[90%] rounded-md px-2 py-1 text-center font-mono leading-tight font-medium [overflow-wrap:anywhere] break-words backdrop-blur-sm",
          compact ? "line-clamp-3 text-[0.7rem]" : "px-3 text-sm sm:text-base",
        )}
      >
        {project.title}
      </span>
    </div>
  );
};
