import React from 'react';
import { cva } from 'class-variance-authority';
import { PopoverContent } from '@/components/ui/popover.jsx';
import { cn } from '@/lib/utils.js';

const quickFilterPopoverVariants = cva(
  "p-1 bg-white border border-gray-200 rounded-lg shadow-xl outline-none data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      size: {
        "type-filter": "w-40",
        "rev-role-filter": "w-56",
      },
    },
  }
);

const QuickFilterPopoverContent = React.forwardRef(({ className, size, ...props }, ref) => {
  return (
    <PopoverContent
      ref={ref}
      className={cn(quickFilterPopoverVariants({ size, className }))}
      {...props}
    />
  );
});

QuickFilterPopoverContent.displayName = "QuickFilterPopoverContent";

export { QuickFilterPopoverContent };
