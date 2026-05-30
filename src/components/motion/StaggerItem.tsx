"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { fadeUp } from "./variants";

/** Ítem hijo de <Stagger>; hereda el escalonado del contenedor. */
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
