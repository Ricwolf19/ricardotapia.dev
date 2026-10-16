import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src: string;
  alt: string;
  /** Rendered size in CSS pixels (square). */
  size: number;
  priority?: boolean;
  className?: string;
}

/** Round photo with a hairline ring. Domain-free: pass any `src`/`alt`. */
export const Avatar = ({ src, alt, size, priority = false, className }: AvatarProps) => (
  <Image
    src={src}
    alt={alt}
    width={size}
    height={size}
    priority={priority}
    className={cn("ring-border shrink-0 rounded-full object-cover ring-1", className)}
  />
);
