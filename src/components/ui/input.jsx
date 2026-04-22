import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils.js";

const inputVariants = cva(
  "w-full min-w-0 rounded-lg border border-input bg-transparent transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 focus:border-[#1E40AF]",
  {
    variants: {
      size: {
        default: "h-8 px-2.5 py-1 text-base md:text-sm",
        micro: "h-[26px] px-1.5 py-1 text-[11px]",
        "advanced-filter": "h-auto px-2 py-1 text-[10px] border border-gray-200 rounded focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary",
      },
      variant: {
        default: "",
        search: "bg-gray-50 border-gray-200 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
);

function Input({ className, type, size = "default", variant = "default", ...props }) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(inputVariants({ size, variant }), className)}
      {...props}
    />
  );
}

export { Input };
