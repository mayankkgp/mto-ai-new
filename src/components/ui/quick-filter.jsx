import React from 'react';
import { Check } from 'lucide-react';
import { Popover, PopoverTrigger } from '@/components/ui/popover.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Command, CommandItem, CommandList } from '@/components/ui/command.jsx';
import { QuickFilterPopoverContent } from '@/components/ui/quick-filter-popover.jsx';

/**
 * QuickFilter Component
 * A reusable selection filter for header bars and compact spaces.
 * 
 * @param {string} label - The display label for the filter trigger.
 * @param {React.ElementType} icon - Lucide icon component to show in the trigger.
 * @param {Array} options - Array of strings or objects { label: string, value: string|number }.
 * @param {Array} selectedValues - Array of currently selected values.
 * @param {Function} onChange - Callback function (value) => void.
 * @param {boolean} isCompact - Whether to hide the text label.
 * @param {string} popoverSize - Variant size for the popover (from quick-filter-popover.jsx).
 */
const QuickFilter = ({ 
  label, 
  icon: Icon, 
  options = [], 
  selectedValues = [], 
  onChange, 
  isCompact,
  popoverSize
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="header-filter" size="header-filter">
          {Icon && <Icon className="h-3.5 w-3.5" />}
          {!isCompact && label && <span>{label}</span>}
        </Button>
      </PopoverTrigger>
      
      <QuickFilterPopoverContent size={popoverSize} align="end">
        <Command>
          <CommandList className="max-h-60 overflow-y-auto overflow-x-hidden no-scrollbar">
            {options.map((option) => {
              const itemLabel = typeof option === 'object' ? option.label : option;
              const itemValue = typeof option === 'object' ? option.value : option;
              const isSelected = selectedValues.includes(itemValue);

              return (
                <CommandItem 
                  key={String(itemValue)}
                  onSelect={() => onChange(itemValue)}
                  className="flex w-full items-center px-3 py-2 text-xs text-gray-700 rounded aria-selected:bg-gray-50 aria-selected:text-gray-900 cursor-pointer"
                >
                  <Check className={`mr-2 h-3 w-3 text-primary transition-opacity ${isSelected ? "opacity-100" : "opacity-0"}`} />
                  <span>{itemLabel}</span>
                </CommandItem>
              );
            })}
          </CommandList>
        </Command>
      </QuickFilterPopoverContent>
    </Popover>
  );
};

export default QuickFilter;
