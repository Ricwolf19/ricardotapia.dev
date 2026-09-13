// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from "vitest";
import { lockBodyScroll, unlockBodyScroll } from "./scrollLock";

/**
 * A leaked lock means the visitor cannot scroll the page any more — the site
 * looks frozen and there is no way back short of a reload. The counter is shared
 * on `globalThis`, so the ordering cases below are the whole contract.
 */
describe("body scroll lock", () => {
  beforeEach(() => {
    // Drain any count left by a previous case, then reset the style.
    for (let i = 0; i < 10; i++) unlockBodyScroll();
    document.body.style.overflow = "";
  });

  it("hides overflow on the first lock", () => {
    lockBodyScroll();
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("restores the original overflow when the last lock is released", () => {
    document.body.style.overflow = "auto";
    lockBodyScroll();
    unlockBodyScroll();
    expect(document.body.style.overflow).toBe("auto");
  });

  it("stays locked while a nested overlay is still open", () => {
    lockBodyScroll();
    lockBodyScroll();
    unlockBodyScroll();
    expect(document.body.style.overflow).toBe("hidden");

    unlockBodyScroll();
    expect(document.body.style.overflow).toBe("");
  });

  it("ignores an unbalanced unlock instead of going negative", () => {
    document.body.style.overflow = "scroll";
    unlockBodyScroll();
    expect(document.body.style.overflow).toBe("scroll");

    // The stray unlock must not have consumed the next real lock's slot.
    lockBodyScroll();
    expect(document.body.style.overflow).toBe("hidden");
    unlockBodyScroll();
    expect(document.body.style.overflow).toBe("scroll");
  });
});
