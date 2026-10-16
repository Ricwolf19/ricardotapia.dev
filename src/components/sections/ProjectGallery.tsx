"use client";

import { useState } from "react";
import Image from "next/image";
import { FileViewer } from "@/components/file-viewer/FileViewer";
import { useFileViewerLabels } from "@/components/file-viewer/useFileViewerLabels";
import { getMimeType } from "@/components/file-viewer/mime";

interface ProjectGalleryProps {
  title: string;
  /** Site-root paths under public/images/projects/<slug>/gallery/. */
  images: string[];
}

/**
 * Case-study screenshots as a grid of thumbnails; clicking one opens the
 * FileViewer in gallery mode (arrows, counter). Renders nothing special for
 * an empty list — the page simply omits the section until images land.
 */
export const ProjectGallery = ({ title, images }: ProjectGalleryProps) => {
  const labels = useFileViewerLabels();
  const [index, setIndex] = useState<number | null>(null);

  const files = images.map((url, i) => ({
    url,
    fileName: url.split("/").pop() ?? `${title}-${i + 1}`,
    mimeType: getMimeType(url),
  }));

  return (
    <>
      <ul className="stagger grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((src, i) => (
          <li key={src} style={{ "--i": i } as React.CSSProperties}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group border-border lift relative block aspect-[16/10] w-full overflow-hidden rounded-md border"
            >
              <Image
                src={src}
                alt={`${title} — ${i + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, 300px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </button>
          </li>
        ))}
      </ul>

      <FileViewer
        file={index === null ? null : (files[index] ?? null)}
        files={files}
        onClose={() => setIndex(null)}
        labels={labels}
      />
    </>
  );
};
