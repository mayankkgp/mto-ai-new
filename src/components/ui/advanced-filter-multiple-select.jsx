import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils.js';

const AdvancedFilterMultipleSelect = React.forwardRef(({ isSelected, children, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "flex w-full items-center px-2 py-1.5 text-xs text-gray-600 rounded hover:bg-white transition-colors cursor-pointer group",
        className
      )}
      {...props}
    >
      <Check className={cn("mr-2 h-3 w-3 text-primary transition-opacity", isSelected ? "opacity-100" : "opacity-0")} />
      {children}
    </button>
  );
});

AdvancedFilterMultipleSelect.displayName = "AdvancedFilterMultipleSelect";

export { AdvancedFilterMultipleSelect };
