/**
 * Local replacement for uploaderkit's `getMimeType`: extension → MIME map.
 * Only what the site serves (credentials PDFs/images) plus common formats.
 */
const MIME_BY_EXTENSION: Record<string, string> = {
  pdf: "application/pdf",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  avif: "image/avif",
  svg: "image/svg+xml",
  mp4: "video/mp4",
  webm: "video/webm",
  mp3: "audio/mpeg",
  txt: "text/plain",
  md: "text/markdown",
  json: "application/json",
  zip: "application/zip",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};

export const getMimeType = (fileNameOrUrl: string): string => {
  const clean = fileNameOrUrl.split(/[?#]/)[0] ?? "";
  const ext = clean.includes(".") ? (clean.split(".").pop() ?? "").toLowerCase() : "";
  return MIME_BY_EXTENSION[ext] ?? "application/octet-stream";
};
