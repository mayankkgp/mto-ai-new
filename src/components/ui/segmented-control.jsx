import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils.js';

const segmentedControlRootVariants = cva(
  "",
  {
    variants: {
      variant: {
        'header-toggle': "flex items-center gap-4",
      },
    },
    defaultVariants: {
      variant: 'header-toggle',
    },
  }
);

const segmentedControlListVariants = cva(
  "",
  {
    variants: {
      variant: {
        'header-toggle': "flex gap-1 bg-gray-100 p-1 rounded-lg h-auto",
      },
    },
    defaultVariants: {
      variant: 'header-toggle',
    },
  }
);

const segmentedControlTriggerVariants = cva(
  "",
  {
    variants: {
      variant: {
        'header-toggle': [
          "px-4 py-1 text-xs font-semibold rounded-md transition-all",
          "text-gray-500 hover:text-gray-700",
          "data-active:bg-white data-active:text-primary data-active:shadow-sm",
          "dark:data-active:bg-gray-800 dark:data-active:text-white"
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: 'header-toggle',
    },
  }
);

/**
 * SegmentedControl Component
 * A reusable abstraction over Tabs for toggle-like interfaces.
 */
const SegmentedControl = ({ 
  value, 
  onValueChange, 
  options = [], 
  variant = 'header-toggle',
  className,
  ...props 
}) => {
  return (
    <Tabs 
      value={value} 
      onValueChange={onValueChange} 
      className={cn(segmentedControlRootVariants({ variant, className }))}
      {...props}
    >
      <TabsList className={cn(segmentedControlListVariants({ variant }))}>
        {options.map((option) => {
          const isString = typeof option === 'string';
          const val = isString ? option : option.value;
          const label = isString ? option : option.label;
          
          return (
            <TabsTrigger 
              key={val} 
              value={val}
              className={cn(segmentedControlTriggerVariants({ variant }))}
            >
              {label}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
};

export default SegmentedControl;
