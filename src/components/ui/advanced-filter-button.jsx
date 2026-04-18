import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils.js';

const advancedFilterButton = cva("inline-flex items-center rounded overflow-hidden transition-colors", {
  variants: {
    state: {
      inactive: "bg-gray-100 text-gray-700 border border-transparent",
      active: "bg-[#F3F4F6] text-[#374151] border border-[#E5E7EB]",
    },
  },
  defaultVariants: {
    state: "inactive",
  },
});
const advancedFilterButtonMain = cva("flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold shrink-0 hover:bg-black/5 transition-colors");
const advancedFilterButtonCross = cva("px-2 py-1.5 border-l border-[#E5E7EB] hover:bg-black/5 transition-colors");

const AdvancedFilterButton = React.forwardRef(({ className, state, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(advancedFilterButton({ state, className }))}
      {...props}
    />
  );
});

AdvancedFilterButton.Main = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(advancedFilterButtonMain({ className }))}
      {...props}
    />
  );
});

AdvancedFilterButton.Cross = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(advancedFilterButtonCross({ className }))}
      {...props}
    />
  );
});

AdvancedFilterButton.displayName = "AdvancedFilterButton";
AdvancedFilterButton.Main.displayName = "AdvancedFilterButton.Main";
AdvancedFilterButton.Cross.displayName = "AdvancedFilterButton.Cross";

export { AdvancedFilterButton };
