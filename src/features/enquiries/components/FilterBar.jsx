import React, { useMemo } from 'react';
import { User, Layers, Check } from 'lucide-react';
import { Popover, PopoverTrigger } from '@/components/ui/popover.jsx';
import { useReferenceData } from '@/contexts/ReferenceDataContext.jsx';
import AdvancedFilterMenu from './AdvancedFilterMenu.jsx';
import AdvancedFilterTrigger from './AdvancedFilterTrigger.jsx';
import PaneHeader from '@/components/ui/pane-header.jsx';
import { SearchBar } from '@/components/ui/search-bar.jsx';
import { Wrapper } from '@/components/ui/wrapper.jsx';
import { Button } from '@/components/ui/button.jsx';
import { QuickFilterPopoverContent } from '@/components/ui/quick-filter-popover.jsx';
import { Command, CommandItem, CommandList } from '@/components/ui/command.jsx';

const FilterBar = ({ 
  isCompact, 
  searchQuery, 
  setSearchQuery, 
  activeFilters, 
  activeFilterCount,
  filterConfig,
  updateFilter,
  toggleFilter,
  removeFilter,
  clearAllFilters
}) => {
  const { users } = useReferenceData();
  
  const revUsers = useMemo(() => {
    return users.filter(u => u.department === 'Revenue' || u.department === 'Admin');
  }, [users]);

  return (
    <PaneHeader variant="filter-bar" className="flex items-center gap-3 relative z-40">
      <div className="flex items-center flex-1 max-w-md">
        <SearchBar 
          variant="header-search-bar" 
          value={searchQuery} 
          onChange={(val) => setSearchQuery(val)} 
          placeholder="Search enquiries..." 
        />
      </div>

      <Wrapper variant="header-filter">
        {/* Type Filter */}
        {!isCompact && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="header-filter" size="header-filter">
                <Layers className="h-3.5 w-3.5" />
                <span>Type</span>
              </Button>
            </PopoverTrigger>
            <QuickFilterPopoverContent size="type-filter" align="end">
              <Command>
                <CommandList>
                  {['MTO', 'Ready'].map(type => (
                    <CommandItem 
                      key={type}
                      onSelect={() => toggleFilter('type', type)}
                      className="flex w-full items-center px-3 py-2 text-xs text-gray-700 rounded aria-selected:bg-gray-50 aria-selected:text-gray-900"
                    >
                      <Check className={`mr-2 h-3 w-3 text-primary transition-opacity ${activeFilters.type.includes(type) ? "opacity-100" : "opacity-0"}`} />
                      <span>{type}</span>
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </QuickFilterPopoverContent>
          </Popover>
        )}

        {/* Rev Role Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="header-filter" size="header-filter">
              <User className="h-3.5 w-3.5" />
              {!isCompact && <span>Rev Role</span>}
            </Button>
          </PopoverTrigger>
          <QuickFilterPopoverContent size="rev-role-filter" align="end">
            <Command>
              <CommandList className="max-h-60 overflow-y-auto overflow-x-hidden no-scrollbar">
                {revUsers.map(user => (
                  <CommandItem 
                    key={user.id}
                    onSelect={() => toggleFilter('revRole', user.id)}
                    className="flex w-full items-center px-3 py-2 text-xs text-gray-700 rounded aria-selected:bg-gray-50 aria-selected:text-gray-900"
                  >
                    <Check className={`mr-2 h-3 w-3 text-primary transition-opacity ${activeFilters.revRole.includes(user.id) ? "opacity-100" : "opacity-0"}`} />
                    <span>{user.name}</span>
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </QuickFilterPopoverContent>
        </Popover>

        {/* Advanced Filter Group */}
        <AdvancedFilterTrigger 
          isCompact={isCompact} 
          activeFilterCount={activeFilterCount} 
          onClearAll={clearAllFilters}
        >
          <AdvancedFilterMenu 
            config={filterConfig}
            activeFilters={activeFilters}
            updateFilter={updateFilter}
            toggleArrayFilter={toggleFilter}
            removeFilter={removeFilter}
            clearFilters={clearAllFilters}
          />
        </AdvancedFilterTrigger>
      </Wrapper>
    </PaneHeader>
  );
};

export default FilterBar;
