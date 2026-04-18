import React, { useMemo } from 'react';
import { SlidersHorizontal, ChevronDown, User, Layers, X, Check } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.jsx';
import { useEnquiryList } from '@/contexts/EnquiryListContext.jsx';
import { useReferenceData } from '@/contexts/ReferenceDataContext.jsx';
import { cn } from '@/lib/utils.js';
import AdvancedFilterMenu from './AdvancedFilterMenu.jsx';
import PaneHeader from '@/components/ui/pane-header.jsx';
import { SearchBar } from '@/components/ui/search-bar.jsx';
import { Wrapper } from '@/components/ui/wrapper.jsx';
import { Button } from '@/components/ui/button.jsx';

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
                <ChevronDown className="h-3 w-3 opacity-50 ml-0.5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-1 bg-white border border-gray-200 rounded-lg shadow-xl" align="end">
              {['MTO', 'Ready'].map(type => (
                <button 
                  key={type}
                  onClick={() => toggleFilter('type', type)}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 rounded transition-colors"
                >
                  <span>{type}</span>
                  {activeFilters.type.includes(type) && <Check className="h-3 w-3 text-primary" />}
                </button>
              ))}
            </PopoverContent>
          </Popover>
        )}

        {/* Rev Role Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="header-filter" size="header-filter">
              <User className="h-3.5 w-3.5" />
              {!isCompact && <span>Rev Role</span>}
              <ChevronDown className="h-3 w-3 opacity-50 ml-0.5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-1 bg-white border border-gray-200 rounded-lg shadow-xl" align="end">
            <div className="max-h-60 overflow-y-auto no-scrollbar">
              {revUsers.map(user => (
                <button 
                  key={user.id}
                  onClick={() => toggleFilter('revRole', user.id)}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 rounded transition-colors"
                >
                  <span>{user.name}</span>
                  {activeFilters.revRole.includes(user.id) && <Check className="h-3 w-3 text-primary" />}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Advanced Filter Group */}
        <div className={cn(
          "flex items-center rounded transition-colors overflow-hidden", 
          activeFilterCount > 0 
            ? "bg-[#F3F4F6] text-[#374151] border border-[#E5E7EB]" 
            : "bg-gray-100 text-gray-700"
        )}>
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold hover:bg-black/5 transition-colors shrink-0">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                {isCompact ? (
                  activeFilterCount > 0 && (
                    <span className="flex items-center justify-center bg-gray-700 text-white text-[9px] w-3.5 h-3.5 rounded-full leading-none">
                      {activeFilterCount}
                    </span>
                  )
                ) : (
                  <span>
                    {activeFilterCount === 0 ? "Filters" : `Filter (${activeFilterCount})`}
                  </span>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-transparent border-none shadow-none" align="end">
              <AdvancedFilterMenu 
                enquiries={enquiries} 
                activeFilters={activeFilters}
                setActiveFilters={setActiveFilters}
                clearAllFilters={clearAllFilters}
              />
            </PopoverContent>
          </Popover>
          
          {activeFilterCount > 0 && (
            <button 
              onClick={clearAllFilters}
              className="px-2 py-1.5 border-l border-[#E5E7EB] hover:bg-black/5 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </Wrapper>
    </PaneHeader>
  );
};

export default FilterBar;
