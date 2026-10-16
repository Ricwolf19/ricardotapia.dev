import { ImageResponse } from "next/og";
import { readAvatarDataUrl } from "@/lib/avatar";

/**
 * Favicon and PWA icons, rendered at build time from the author photo so one
 * file in public/ drives every size. `512-maskable` pads the circle into the
 * ~80% safe zone Android crops to; the others are the bare circle.
 */
const ICONS = [
  { id: "32", size: 32, maskable: false },
  { id: "192", size: 192, maskable: false },
  { id: "512", size: 512, maskable: false },
  { id: "512-maskable", size: 512, maskable: true },
] as const;

/** Prerender at build time: the photo is read from public/, which a serverless function cannot see. */
export const dynamic = "force-static";

/** Dark `--background` token; Satori resolves no CSS vars. */
const MASKABLE_BACKGROUND = "#0c0c0f";

export const generateImageMetadata = () =>
  ICONS.map(({ id, size }) => ({
    id,
    contentType: "image/png",
    size: { width: size, height: size },
  }));

const Icon = async ({ id }: { id: string }) => {
  const icon = ICONS.find((i) => i.id === id) ?? ICONS[0];
  const src = await readAvatarDataUrl();
  const circle = icon.maskable ? Math.round(icon.size * 0.8) : icon.size;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: icon.maskable ? MASKABLE_BACKGROUND : "transparent",
      }}
    >
      <img
        src={src}
        alt=""
        width={circle}
        height={circle}
        style={{ borderRadius: "50%", objectFit: "cover" }}
      />
    </div>,
    { width: icon.size, height: icon.size },
  );
};

export default Icon;
