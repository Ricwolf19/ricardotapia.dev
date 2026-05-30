import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { fieldBase } from "./field-base";

export const Select = ({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) => (
  <select className={cn(fieldBase, "h-10", className)} {...props}>
    {children}
  </select>
);
