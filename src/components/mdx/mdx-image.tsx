import Image from "next/image";

interface MdxImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

/** Imagen optimizada para uso dentro de MDX. */
export const MdxImage = ({ src, alt, width = 1200, height = 800 }: MdxImageProps) => (
  <Image
    src={src}
    alt={alt}
    width={width}
    height={height}
    className="border-border my-8 rounded-lg border"
    sizes="(max-width: 768px) 100vw, 768px"
  />
);
