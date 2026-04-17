import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils.js';

/**
 * masterPaneVariants
 * Defines the structural and thematic variants for the MasterPane component.
 */
const masterPaneVariants = cva(
  "",
  {
    variants: {
      variant: {
        'gallery-master-pane': "h-full w-full bg-white border-r border-gray-200",
      },
    },
    defaultVariants: {
      variant: 'gallery-master-pane',
    },
  }
);

/**
 * MasterPane Component
 * A reusable primitive for the left-hand master list views.
 * Standardizes layout and theming across different modules.
 */
const MasterPane = React.forwardRef(({ className, variant, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(masterPaneVariants({ variant, className }))}
      {...props}
    />
  );
});

MasterPane.displayName = "MasterPane";

export default MasterPane;
