import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { fieldBase } from "./field-base";

export const Textarea = ({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea className={cn(fieldBase, "min-h-28 resize-y", className)} {...props} />
);
