import React from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.jsx';
import { AdvancedFilterButton } from '@/components/ui/advanced-filter-button.jsx';

/**
 * AdvancedFilterTrigger Component
 * Reusable wrapper for advanced filter trigger and content logic.
 */
const AdvancedFilterTrigger = ({ 
  isCompact, 
  activeFilterCount, 
  onClearAll, 
  children 
}) => {
  return (
    <AdvancedFilterButton state={activeFilterCount > 0 ? "active" : "inactive"}>
      <Popover>
        <PopoverTrigger asChild>
          <AdvancedFilterButton.Main>
            <SlidersHorizontal className="h-3.5 w-3.5" />
            {!isCompact && <span>Filters</span>}
          </AdvancedFilterButton.Main>
        </PopoverTrigger>

        <PopoverContent variant="advanced-filter" align="end">
          {children}
        </PopoverContent>
      </Popover>
      
      {activeFilterCount > 0 && (
        <AdvancedFilterButton.Cross 
          onClick={onClearAll} 
          className="flex items-center justify-center gap-1.5 px-2 h-full"
        >
          <span className="text-xs font-medium">{activeFilterCount}</span>
          <X className="w-3.5 h-3.5" />
        </AdvancedFilterButton.Cross>
      )}
    </AdvancedFilterButton>
  );
};

export default AdvancedFilterTrigger;
