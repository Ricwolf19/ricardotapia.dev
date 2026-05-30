"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { fadeUp } from "./variants";

interface FadeUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** "view" anima al entrar al viewport; "mount" anima al montar (above the fold). */
  trigger?: "view" | "mount";
}

/** Entrada fade + slide-up reutilizable. Respeta prefers-reduced-motion vía MotionConfig. */
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
