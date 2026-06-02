"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { fadeUp } from "./variants";

/** Child item of <Stagger>; inherits the staggering from the container. */
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
