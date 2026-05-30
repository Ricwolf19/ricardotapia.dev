"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Aplica reducedMotion="user": desactiva animaciones si el SO lo pide (a11y). */
export const MotionProvider = ({ children }: { children: ReactNode }) => (
  <MotionConfig reducedMotion="user">{children}</MotionConfig>
);
