import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input.jsx';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils.js';

const searchBarVariants = cva(
  "relative w-full flex items-center text-gray-400 focus-within:text-gray-600 transition-colors",
  {
    variants: {
      variant: {
        'header-search-bar': [
          "h-8",
          "[&_input]:h-full [&_input]:w-full [&_input]:pl-9 [&_input]:pr-8 [&_input]:text-xs [&_input]:rounded",
          "[&>.lucide-search]:absolute [&>.lucide-search]:left-3 [&>.lucide-search]:size-3.5 [&>.lucide-search]:pointer-events-none",
          "[&>button]:absolute [&>button]:right-2 [&>button]:p-1 [&>button]:rounded-full hover:[&>button]:bg-gray-200/50 [&>button_svg]:size-3.5"
        ].join(" ")
      }
    },
    defaultVariants: {
      variant: 'header-search-bar'
    }
  }
);

/**
 * SearchBar Component
 * A centralized search input group with standard geometry and physics.
 */
const SearchBar = React.forwardRef(({ variant, value, onChange, placeholder, ...props }, ref) => {
  const handleClear = () => {
    if (onChange) {
      onChange('');
    }
  };

  return (
    <div className={cn(searchBarVariants({ variant }))} ref={ref} {...props}>
      <Search className="lucide-search" />
      <Input
        variant="search"
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value && value.length > 0 && (
        <button 
          onClick={handleClear}
          className="flex items-center justify-center transition-colors"
          type="button"
        >
          <X />
        </button>
      )}
    </div>
  );
});

SearchBar.displayName = "SearchBar";

export { SearchBar };
