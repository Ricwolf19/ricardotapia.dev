import { describe, it, expect } from "vitest";
import {
  isPublicLink,
  isPublicApp,
  splitLinks,
  splitApps,
  getLiveUrl,
  getPublicUrl,
  workProjects,
  projects,
} from "@/data/projects";
import type { Project, ProjectLink, SubApp } from "@/types";

/** Builder so each case states only the field under test. */
const makeLink = (overrides: Partial<ProjectLink> = {}): ProjectLink => ({
  label: "Live",
  url: "https://example.com",
  type: "live",
  ...overrides,
});

const makeProject = (overrides: Partial<Project> = {}): Project =>
  ({
    id: "p1",
    slug: "demo",
    title: "Demo",
    tagline: "",
    description: "",
    status: "production",
    visibility: "public",
    category: "saas",
    thumbnail: "",
    links: [],
    startDate: "2025-01",
    tags: [],
    technologies: [],
    ...overrides,
  }) as Project;

/**
 * `public` is optional on links, so visibility is decided by a *default*. Get the
 * default wrong and an admin console URL is rendered on a public case study —
 * which is why these assertions exist rather than trusting the data entry.
 */
describe("isPublicLink", () => {
  const cases: { name: string; link: ProjectLink; expected: boolean }[] = [
    {
      name: "admin links are private by default",
      link: makeLink({ type: "admin" }),
      expected: false,
    },
    { name: "live links are public by default", link: makeLink({ type: "live" }), expected: true },
    { name: "repo links are public by default", link: makeLink({ type: "repo" }), expected: true },
    {
      name: "an explicit false overrides the type default",
      link: makeLink({ type: "live", public: false }),
      expected: false,
    },
    {
      name: "an explicit true overrides the admin default",
      link: makeLink({ type: "admin", public: true }),
      expected: true,
    },
  ];

  it.each(cases)("$name", ({ link, expected }) => {
    expect(isPublicLink(link)).toBe(expected);
  });
});

describe("isPublicApp", () => {
  it("treats monorepo apps as private unless marked public", () => {
    expect(isPublicApp({ public: undefined } as SubApp)).toBe(false);
    expect(isPublicApp({ public: true } as SubApp)).toBe(true);
  });
});

describe("splitLinks / splitApps", () => {
  it("partitions without losing or duplicating an entry", () => {
    const links = [makeLink({ type: "live" }), makeLink({ type: "admin", url: "https://a.test" })];
    const { publicLinks, privateLinks } = splitLinks(links);
    expect(publicLinks).toHaveLength(1);
    expect(privateLinks).toHaveLength(1);
    expect(publicLinks.length + privateLinks.length).toBe(links.length);
  });

  it("handles an empty list", () => {
    expect(splitApps([])).toEqual({ publicApps: [], privateApps: [] });
  });
});

describe("getLiveUrl", () => {
  it("returns nothing for login-gated apps, whatever links they carry", () => {
    const p = makeProject({ loginRequired: true, links: [makeLink({ type: "live" })] });
    expect(getLiveUrl(p)).toBeUndefined();
  });

  it("prefers a landing page over the app itself", () => {
    const p = makeProject({
      links: [
        makeLink({ type: "live", url: "https://app.test" }),
        makeLink({ type: "landing", url: "https://landing.test" }),
      ],
    });
    expect(getLiveUrl(p)).toBe("https://landing.test");
  });

  it("never returns a link marked private", () => {
    const p = makeProject({ links: [makeLink({ type: "live", public: false })] });
    expect(getLiveUrl(p)).toBeUndefined();
  });
});

describe("getPublicUrl", () => {
  it("falls back to the repository when there is no live site", () => {
    const p = makeProject({ links: [], repoUrl: "https://github.com/x/y" });
    expect(getPublicUrl(p)).toEqual({ url: "https://github.com/x/y", kind: "repo" });
  });

  it("does not leak a repo for a login-gated project", () => {
    const p = makeProject({ loginRequired: true, repoUrl: "https://github.com/x/y" });
    expect(getPublicUrl(p)).toBeUndefined();
  });
});

describe("workProjects", () => {
  it("excludes internal projects", () => {
    expect(workProjects.some((p) => p.status === "internal")).toBe(false);
  });

  it("sorts priority projects first", () => {
    const lastPriorityIndex = workProjects.map((p) => Boolean(p.priority)).lastIndexOf(true);
    const firstNonPriority = workProjects.map((p) => Boolean(p.priority)).indexOf(false);
    if (lastPriorityIndex !== -1 && firstNonPriority !== -1) {
      expect(lastPriorityIndex).toBeLessThan(firstNonPriority);
    }
  });

  it("keeps slugs unique — duplicates would collide as routes", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
