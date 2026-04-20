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
        'master-header': "bg-white border-b border-gray-200 h-header-fluid px-4 w-full shrink-0",
        'filter-bar': "bg-white border-b border-gray-200 shrink-0 h-[40px] min-[height:801px]:h-[48px] px-2 min-[height:801px]:px-4 py-1 min-[height:801px]:py-1.5",
        'detail-header-split': "bg-gray-50 border-b border-gray-200 h-header-fluid px-nav-fluid py-nav-fluid shrink-0",
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
