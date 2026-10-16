import { describe, it, expect } from "vitest";
import { legacyRedirects } from "@/lib/redirects";
import { STATIC_PATHS } from "@/app/sitemap";

/** Strip the locale segment and the wildcard so a destination compares to STATIC_PATHS. */
const routeOf = (destination: string): string =>
  destination.replace(/^\/(:locale|es|en)/, "").replace(/\/:path\*$/, "");

/** The expression a source matches, as a RegExp. Only the two patterns we use. */
const sourceMatcher = (source: string): RegExp =>
  new RegExp("^" + source.replace(":locale(es|en)", "(es|en)").replace("/:path*", "(/.*)?") + "$");

describe("legacy redirects", () => {
  const cases = [
    ["/:locale(es|en)/work/:path*", "/:locale/projects/:path*"],
    ["/:locale(es|en)/certificaciones", "/:locale/certifications"],
    ["/:locale(es|en)/about", "/:locale/experience"],
    ["/work/:path*", "/es/projects/:path*"],
    ["/certificaciones", "/es/certifications"],
    ["/about", "/es/experience"],
  ] as const;

  it.each(cases)("%s -> %s", (source, destination) => {
    expect(legacyRedirects).toContainEqual({ source, destination, permanent: true });
  });

  it("is permanent (308) everywhere — a 307 would keep Google on the old URL", () => {
    for (const r of legacyRedirects) expect(r.permanent).toBe(true);
  });

  it("never chains: no destination is matched by another source", () => {
    for (const r of legacyRedirects) {
      const concrete = r.destination.replace(":locale", "es").replace("/:path*", "/x");
      for (const other of legacyRedirects) {
        expect(sourceMatcher(other.source).test(concrete)).toBe(false);
      }
    }
  });

  it("lands every destination on a live route", () => {
    const live = new Set<string>(STATIC_PATHS);
    for (const r of legacyRedirects) {
      const route = routeOf(r.destination);
      expect(live.has(route) || route.startsWith("/projects")).toBe(true);
    }
  });

  it("never redirects a live page away", () => {
    for (const path of STATIC_PATHS) {
      for (const r of legacyRedirects) {
        expect(sourceMatcher(r.source).test(`/es${path}`)).toBe(false);
      }
    }
  });
});
