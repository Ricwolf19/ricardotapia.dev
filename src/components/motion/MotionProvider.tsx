"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Applies reducedMotion="user": disables animations if the OS requests it (a11y). */
export const MotionProvider = ({ children }: { children: ReactNode }) => (
  <MotionConfig reducedMotion="user">{children}</MotionConfig>
);
