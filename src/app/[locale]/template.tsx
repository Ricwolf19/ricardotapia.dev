"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE } from "@/components/motion/variants";

/**
 * Per-navigation page transition. `template.tsx` re-mounts on every route change
 * (unlike `layout.tsx`), so this gives a consistent, subtle fade across the app.
 *
 * Only opacity is animated on purpose: animating `transform` would create a
 * containing block and break the `position: sticky` sidebar on case studies.
 * `MotionProvider` (reducedMotion="user") disables this for users who opt out.
 */
const Template = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3, ease: EASE }}
  >
    {children}
  </motion.div>
);

export default Template;
