import React, { useState, useMemo } from 'react';
import MasterHeader from './MasterHeader.jsx';
import FilterBar from './FilterBar.jsx';
import DataGrid from './DataGrid.jsx';
import { useUIState } from '@/contexts/UIStateContext.jsx';
import { useEnquiryList } from '@/contexts/EnquiryListContext.jsx';
import { useEnquiryDetail } from '@/contexts/EnquiryDetailContext.jsx';
import { useReferenceData } from '@/contexts/ReferenceDataContext.jsx';
import { useGlobalFilter } from '@/hooks/useGlobalFilter.js';
import { getEnquiryFilterConfig } from '../config/filterConfig.js';
import Pane from '@/components/ui/pane.jsx';

/**
 * EnquiryMasterPane Component
 * Main container for the left side of the screen (Master Pane).
 * Assembles the Header, FilterBar, and DataGrid.
 */
const EnquiryMasterPane = () => {
  const { enquiries } = useEnquiryList();
  const { users, channels: referenceChannels } = useReferenceData();
  const { isCreating, statusTab, setStatusTab, isCompact: isCompactProp } = useUIState();
  const { activeEnquiryId } = useEnquiryDetail();
  
  // Force compact mode if an enquiry is active or being created (Detail Pane is open)
  const isCompact = (activeEnquiryId || isCreating) ? true : isCompactProp;
  
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Dynamic Options for Filter Config
  const uniqueCities = useMemo(() => {
    const cities = enquiries.map(e => e.customer?.city).filter(Boolean);
    return [...new Set(cities)];
  }, [enquiries]);

  const filterConfig = useMemo(() => getEnquiryFilterConfig({
    users,
    channels: referenceChannels,
    cities: uniqueCities
  }), [users, referenceChannels, uniqueCities]);

  // 2. Global Filter Hook
  const {
    filteredData,
    activeFilters,
    updateFilter,
    toggleArrayFilter,
    removeFilter,
    clearFilters
  } = useGlobalFilter(filterConfig, enquiries);

  // 3. Base Filtering (Status Tab & Global Search)
  const finalFilteredData = useMemo(() => {
    return filteredData.filter(enquiry => {
      // Status Tab Filter
      if (enquiry.status !== statusTab) return false;

      // Global Search Query Filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesCustomer = enquiry.customer?.name?.toLowerCase().includes(query);
        const matchesId = enquiry.id?.toLowerCase().includes(query);
        const matchesOverview = enquiry.leadOverview?.toLowerCase().includes(query);
        
        if (!matchesCustomer && !matchesId && !matchesOverview) return false;
      }

      return true;
    });
  }, [filteredData, statusTab, searchQuery]);

  const handleClearAll = () => {
    setSearchQuery('');
    clearFilters();
  };

  return (
    <Pane variant="gallery-master-pane" className="flex flex-col overflow-hidden">
      <MasterHeader 
        isCompact={isCompact} 
        statusTab={statusTab} 
        setStatusTab={setStatusTab} 
      />
      <FilterBar 
        isCompact={isCompact} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeFilters={activeFilters}
        filterConfig={filterConfig}
        updateFilter={updateFilter}
        toggleFilter={toggleArrayFilter}
        removeFilter={removeFilter}
        clearAllFilters={handleClearAll}
      />
      
      <DataGrid 
        isCompact={isCompact} 
        filteredEnquiries={finalFilteredData}
      />
    </Pane>
  );
};

export default EnquiryMasterPane;
