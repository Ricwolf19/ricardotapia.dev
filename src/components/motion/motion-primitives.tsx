"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

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

interface StaggerProps {
  children: ReactNode;
  className?: string;
  trigger?: "view" | "mount";
}

/** Contenedor que escalona la entrada de sus <StaggerItem> hijos. */
export const Stagger = ({ children, className, trigger = "view" }: StaggerProps) => {
  const activation =
    trigger === "mount"
      ? { animate: "show" as const }
      : { whileInView: "show" as const, viewport: { once: true, margin: "-80px" } };

  return (
    <motion.div className={className} variants={container} initial="hidden" {...activation}>
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <motion.div className={className} variants={fadeUp}>
    {children}
  </motion.div>
);
