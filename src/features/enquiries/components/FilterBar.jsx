import React, { useMemo } from 'react';
import { User, Layers } from 'lucide-react';
import { useReferenceData } from '@/contexts/ReferenceDataContext.jsx';
import AdvancedFilterMenu from '@/components/ui/advanced-filter-menu.jsx';
import AdvancedFilterTrigger from '@/components/ui/advanced-filter-trigger.jsx';
import PaneHeader from '@/components/ui/pane-header.jsx';
import { SearchBar } from '@/components/ui/search-bar.jsx';
import { Wrapper } from '@/components/ui/wrapper.jsx';
import QuickFilter from '@/components/ui/quick-filter.jsx';

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
          <QuickFilter 
            label="Type"
            icon={Layers}
            options={['MTO', 'Ready']}
            selectedValues={activeFilters.type}
            onChange={(val) => toggleFilter('type', val)}
            popoverSize="type-filter"
          />
        )}

        {/* Rev Role Filter */}
        <QuickFilter 
          label="Rev Role"
          icon={User}
          options={revUsers.map(u => ({ label: u.name, value: u.id }))}
          selectedValues={activeFilters.revRole}
          onChange={(val) => toggleFilter('revRole', val)}
          popoverSize="rev-role-filter"
          isCompact={isCompact}
        />

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
