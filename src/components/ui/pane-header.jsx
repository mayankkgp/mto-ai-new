import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils.js';

/**
 * paneHeaderVariants
 * Defines the structural and thematic variants for the PaneHeader component.
 * Uses a zero-base strategy where layout is injected at implementation.
 */
const paneHeaderVariants = cva(
  "",
  {
    variants: {
      variant: {
        'master-header': "h-header-fluid px-nav-fluid border-b border-gray-200 bg-background shrink-0",
      },
    },
    defaultVariants: {
      variant: 'master-header',
    },
  }
);

/**
 * PaneHeader Component
 * A reusable primitive for pane headers across the application.
 * Standardizes dimensions and identity while allowing custom layout.
 */
const PaneHeader = React.forwardRef(({ className, variant, ...props }, ref) => {
  return (
    <header
      ref={ref}
      className={cn(paneHeaderVariants({ variant, className }))}
      {...props}
    />
  );
});

PaneHeader.displayName = "PaneHeader";

export default PaneHeader;
