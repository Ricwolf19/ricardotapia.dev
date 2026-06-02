"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { fadeUp } from "./variants";

interface FadeUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** "view" animates on entering the viewport; "mount" animates on mount (above the fold). */
  trigger?: "view" | "mount";
}

/** Reusable fade + slide-up entrance. Respects prefers-reduced-motion via MotionConfig. */
export const FadeUp = ({ children, className, delay = 0, trigger = "view" }: FadeUpProps) => {
  const activation =
    trigger === "mount"
      ? { animate: "show" as const }
      : { whileInView: "show" as const, viewport: { once: true, margin: "-80px" } };

  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      transition={{ delay }}
      {...activation}
    >
      {children}
    </motion.div>
  );
};
