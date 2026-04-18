import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils.js';

const wrapperVariants = cva(
  "",
  {
    variants: {
      variant: {
        'header-filter': "flex flex-1 items-center gap-3",
      },
    },
    defaultVariants: {
      variant: 'header-filter',
    },
  }
);

/**
 * Wrapper Component
 * A universal layout primitive for grouping elements with standardized spacing and alignment.
 */
const Wrapper = React.forwardRef(({ className, variant, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(wrapperVariants({ variant, className }))}
      {...props}
    />
  );
});

Wrapper.displayName = "Wrapper";

export { Wrapper };
