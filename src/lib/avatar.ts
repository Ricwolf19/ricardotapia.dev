import { promises as fs } from "node:fs";
import path from "node:path";
import { siteConfig } from "@/data/site";

/**
 * The author photo as a data URL, for Satori (`ImageResponse`), which cannot
 * fetch a relative `/me.jpg` at build time. Server-only: reads from `public/`.
 */
export const readAvatarDataUrl = async (): Promise<string> => {
  const file = path.join(process.cwd(), "public", siteConfig.avatar);
  const buffer = await fs.readFile(file);
  return `data:image/jpeg;base64,${buffer.toString("base64")}`;
};
