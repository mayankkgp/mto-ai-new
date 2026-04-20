import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils.js';

/**
 * paneVariants
 * Defines the structural and thematic variants for the Pane component.
 */
export const paneVariants = cva(
  "",
  {
    variants: {
      variant: {
        'gallery-master-pane': "h-full w-full bg-white border-r border-gray-200",
        'details-pane-split': "bg-white border-l border-gray-200",
      },
    },
    defaultVariants: {
      variant: 'gallery-master-pane',
    },
  }
);

/**
 * Pane Component
 * A reusable primitive for the left-hand master list views.
 * Standardizes layout and theming across different modules.
 */
const Pane = React.forwardRef(({ className, variant, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(paneVariants({ variant, className }))}
      {...props}
    />
  );
});

Pane.displayName = "Pane";

export default Pane;
