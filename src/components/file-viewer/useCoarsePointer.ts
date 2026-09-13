import { useEffect, useState } from "react";

/**
 * `true` on touch-first devices (`pointer: coarse`), where the viewer's
 * labeled buttons collapse to glyphs. SSR-safe: first paint assumes a fine
 * pointer and corrects in the effect.
 */
export const useCoarsePointer = (): boolean => {
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(pointer: coarse)");
    setCoarse(query.matches);
    const onChange = (event: MediaQueryListEvent) => setCoarse(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return coarse;
};
