import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils.js";

const inputVariants = cva(
  "w-full min-w-0 rounded-lg border border-input bg-transparent transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      size: {
        default: "h-8 px-2.5 py-1 text-base md:text-sm",
        micro: "h-[26px] min-h-[26px] px-1.5 py-0 text-[11px] leading-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#1E40AF] disabled:bg-gray-50 disabled:opacity-100 disabled:text-gray-500 placeholder:text-gray-400 placeholder:font-normal",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

function Input({ className, type, size = "default", ...props }) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(inputVariants({ size }), className)}
      {...props}
    />
  );
}

export { Input };
