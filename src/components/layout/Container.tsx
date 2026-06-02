import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/** Max-width wrapper (spec §3 Layout: max-w-6xl, responsive px). */
export const Container = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)} {...props} />
);
