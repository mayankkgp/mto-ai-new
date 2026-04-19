import React, { useMemo } from 'react';
import { SlidersHorizontal, User, Layers, X, Check } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.jsx';
import { useEnquiryList } from '@/contexts/EnquiryListContext.jsx';
import { useReferenceData } from '@/contexts/ReferenceDataContext.jsx';
import AdvancedFilterMenu from './AdvancedFilterMenu.jsx';
import PaneHeader from '@/components/ui/pane-header.jsx';
import { SearchBar } from '@/components/ui/search-bar.jsx';
import { Wrapper } from '@/components/ui/wrapper.jsx';
import { Button } from '@/components/ui/button.jsx';
import { AdvancedFilterButton } from '@/components/ui/advanced-filter-button.jsx';
import { QuickFilterPopoverContent } from '@/components/ui/quick-filter-popover.jsx';
import { Command, CommandItem, CommandList } from '@/components/ui/command.jsx';

const FilterBar = ({ 
  isCompact, 
  searchQuery, 
  setSearchQuery, 
  activeFilters, 
  setActiveFilters,
  clearAllFilters
}) => {
  const { enquiries } = useEnquiryList();
  const { users } = useReferenceData();
  
  const revUsers = useMemo(() => {
    return users.filter(u => u.department === 'Revenue' || u.department === 'Admin');
  }, [users]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (activeFilters.type?.length > 0) count++;
    if (activeFilters.revRole?.length > 0) count++;
    if (activeFilters.supply?.length > 0) count++;
    if (activeFilters.channel !== '') count++;
    if (activeFilters.city !== '') count++;
    if (activeFilters.source !== '') count++;
    if (activeFilters.leadDateStart || activeFilters.leadDateEnd) count++;
    if (activeFilters.revDueStart || activeFilters.revDueEnd) count++;
    if (activeFilters.supDueStart || activeFilters.supDueEnd) count++;
    if (activeFilters.minExpValue || activeFilters.maxExpValue) count++;
    return count;
  }, [activeFilters]);

  const toggleFilter = (category, value) => {
    setActiveFilters(prev => {
      const current = prev[category];
      const next = current.includes(value) 
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [category]: next };
    });
  };

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
        <AdvancedFilterButton state={activeFilterCount > 0 ? "active" : "inactive"}>
          <Popover>
            <PopoverTrigger asChild>
              <AdvancedFilterButton.Main>
                <SlidersHorizontal className="h-3.5 w-3.5" />
                {isCompact ? (
                  activeFilterCount > 0 && (
                    <span className="flex items-center justify-center bg-gray-700 text-white text-[9px] w-3.5 h-3.5 rounded-full leading-none">
                      {activeFilterCount}
                    </span>
                  )
                ) : (
                  <span className="inline-block w-[64px] text-left">
                    {activeFilterCount === 0 ? "Filters" : `Filter (${activeFilterCount})`}
                  </span>
                )}
              </AdvancedFilterButton.Main>
            </PopoverTrigger>

            <PopoverContent variant="advanced-filter" align="end">
              <AdvancedFilterMenu 
                enquiries={enquiries} 
                activeFilters={activeFilters}
                setActiveFilters={setActiveFilters}
                clearAllFilters={clearAllFilters}
              />
            </PopoverContent>
          </Popover>
          
          {activeFilterCount > 0 && (
            <AdvancedFilterButton.Cross onClick={clearAllFilters}>
              <X className="h-3.5 w-3.5" />
            </AdvancedFilterButton.Cross>
          )}
        </AdvancedFilterButton>
      </Wrapper>
    </PaneHeader>
  );
};

export default FilterBar;
