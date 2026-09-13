import { useEffect, useMemo, useRef } from "react";

/**
 * Which open overlay answers a dismiss key. Two listeners on the same node in
 * the same phase both run — `stopPropagation` only stops other NODES — so the
 * innermost overlay (the one that opened last) must be the only one answering
 * Escape.
 */
let sequence = 0;
const stack: number[] = [];

export type OverlayLayer = {
  /** `true` while this layer is the innermost open one. */
  isTopmost: () => boolean;
};

/** Joins the stack while `active`, and leaves it on close or unmount. */
export const useOverlayLayer = (active: boolean): OverlayLayer => {
  const idRef = useRef(0);
  if (idRef.current === 0) idRef.current = ++sequence;

  useEffect(() => {
    if (!active) return;
    const id = idRef.current;
    stack.push(id);
    return () => {
      const at = stack.lastIndexOf(id);
      if (at !== -1) stack.splice(at, 1);
    };
  }, [active]);

  return useMemo(() => ({ isTopmost: () => stack[stack.length - 1] === idRef.current }), []);
};
