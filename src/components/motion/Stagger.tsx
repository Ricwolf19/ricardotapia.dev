"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { staggerContainer } from "./variants";

interface StaggerProps {
  children: ReactNode;
  className?: string;
  /** "view" animates on entering the viewport; "mount" animates on mount (above the fold). */
  trigger?: "view" | "mount";
}

/** Container that staggers the entrance of its <StaggerItem> children. */
export const Stagger = ({ children, className, trigger = "view" }: StaggerProps) => {
  const activation =
    trigger === "mount"
      ? { animate: "show" as const }
      : { whileInView: "show" as const, viewport: { once: true, margin: "-80px" } };

  return (
    <motion.div className={className} variants={staggerContainer} initial="hidden" {...activation}>
      {children}
    </motion.div>
  );
};
