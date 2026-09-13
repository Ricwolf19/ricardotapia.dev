/**
 * Body scroll lock, reference counted across overlays — the state lives on
 * `globalThis` so every copy converges on one counter.
 */
type ScrollLockState = { count: number; saved: string };

const KEY = Symbol.for("pibytelabs.bodyScrollLock");

const state = (): ScrollLockState => {
  const host = globalThis as { [KEY]?: ScrollLockState };
  return (host[KEY] ??= { count: 0, saved: "" });
};

export const lockBodyScroll = (): void => {
  const lock = state();
  if (lock.count === 0) {
    lock.saved = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  lock.count += 1;
};

export const unlockBodyScroll = (): void => {
  const lock = state();
  // An unbalanced unlock must be a no-op — decrementing past zero would
  // re-apply a stale saved value onto a page nobody locked.
  if (lock.count === 0) return;
  lock.count -= 1;
  if (lock.count === 0) document.body.style.overflow = lock.saved;
};
