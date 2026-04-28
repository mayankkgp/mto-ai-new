import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils.js";

/**
 * Spinner Component
 * A reusable loading spinner utilizing the Loader2 icon from lucide-react.
 */
export function Spinner({ size = 14, className, ...props }) {
  return (
    <Loader2
      size={size}
      className={cn("animate-spin shrink-0", className)}
      {...props}
    />
  );
}
