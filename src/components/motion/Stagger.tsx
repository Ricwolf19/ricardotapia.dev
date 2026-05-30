"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { staggerContainer } from "./variants";

interface StaggerProps {
  children: ReactNode;
  className?: string;
  /** "view" anima al entrar al viewport; "mount" anima al montar (above the fold). */
  trigger?: "view" | "mount";
}

/** Contenedor que escalona la entrada de sus <StaggerItem> hijos. */
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
