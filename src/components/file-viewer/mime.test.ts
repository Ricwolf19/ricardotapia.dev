import { describe, it, expect } from "vitest";
import { getMimeType } from "./mime";

describe("getMimeType", () => {
  const cases: [string, string][] = [
    ["titulo-tsu.pdf", "application/pdf"],
    ["cert.JPEG", "image/jpeg"],
    ["/credentials/full-stack-foundations.jpeg", "image/jpeg"],
    // Query strings and fragments must not be read as the extension.
    ["https://cdn.test/file.png?v=2", "image/png"],
    ["https://cdn.test/file.png#page=3", "image/png"],
    // Dotted names: only the last segment counts.
    [
      "my.report.final.docx",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    // Unknown and degenerate inputs fall back rather than throwing.
    ["README", "application/octet-stream"],
    ["archive.tar.gz", "application/octet-stream"],
    ["", "application/octet-stream"],
    ["trailing.", "application/octet-stream"],
  ];

  it.each(cases)("%s -> %s", (input, expected) => {
    expect(getMimeType(input)).toBe(expected);
  });
});
