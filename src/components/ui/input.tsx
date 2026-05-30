import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { fieldBase } from "./field-base";

export const Input = ({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) => (
  <input className={cn(fieldBase, "h-10", className)} {...props} />
);
