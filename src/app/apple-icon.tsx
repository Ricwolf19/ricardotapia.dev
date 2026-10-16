import { ImageResponse } from "next/og";
import { readAvatarDataUrl } from "@/lib/avatar";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Square: iOS applies its own rounded mask, so a pre-cut circle would show corners. */
const AppleIcon = async () => {
  const src = await readAvatarDataUrl();
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      <img src={src} alt="" width={180} height={180} style={{ objectFit: "cover" }} />
    </div>,
    size,
  );
};

export default AppleIcon;
