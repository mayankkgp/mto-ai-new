import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.jsx';
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from '@/components/ui/command.jsx';
import { ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils.js';

/**
 * MultiSelect Component
 * A generic multi-selection input compatible with FormField.
 */
const MultiSelect = ({ 
  options = [], 
  selectedValues = [], 
  onChange, 
  icon: Icon = ChevronDown, 
  placeholder = "Select...", 
  isReadOnly, 
  className 
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button 
          type="button"
          disabled={isReadOnly}
          className={cn(
            "flex flex-wrap items-center gap-1 min-h-[26px] p-[2px] bg-white border border-gray-200 rounded text-left transition-colors focus-within:border-[#1E40AF]",
            isReadOnly 
              ? "bg-gray-50 cursor-not-allowed" 
              : "cursor-pointer hover:border-primary/40",
            className
          )}
        >
          {selectedValues?.map(val => {
            const option = options.find(o => o.value === val);
            if (!option) return null;
            return (
              <div 
                key={val}
                className="flex items-center gap-1 px-1 py-0.5 text-[9px] font-bold text-gray-600 bg-gray-100 border border-gray-200 rounded"
              >
                {option.label}
                {!isReadOnly && (
                  <X 
                    size={10} 
                    className="hover:text-red-500 cursor-pointer" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onChange(val);
                    }}
                  />
                )}
              </div>
            );
          })}
          {!isReadOnly && (
            <div className="ml-auto p-0.5 text-gray-400 hover:text-primary">
              <Icon size={12} />
            </div>
          )}
        </button>
      </PopoverTrigger>
      {!isReadOnly && (
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0 bg-white border border-gray-200 rounded shadow-xl overflow-hidden flex flex-col" align="start">
          <Command className="bg-transparent">
            <CommandInput 
              size="micro-search"
              placeholder={placeholder}
            />
            <CommandList className="max-h-[160px] overflow-y-auto no-scrollbar">
              <CommandEmpty className="px-2 py-3 text-center text-[10px] text-gray-400 italic">No results found.</CommandEmpty>
              <CommandGroup className="p-0">
                {options.map((option) => {
                  const isSelected = selectedValues?.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      variant="micro-dropdown-items"
                      onSelect={() => onChange(option.value)}
                      className="aria-selected:bg-gray-50 px-2"
                      data-checked={isSelected}
                    >
                      <span className={cn("truncate", isSelected && "text-primary font-bold")}>
                        {option.label}
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      )}
    </Popover>
  );
};

export default MultiSelect;
