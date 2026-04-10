import React, { useState, useMemo } from 'react';
import MasterHeader from './MasterHeader.jsx';
import FilterBar from './FilterBar.jsx';
import DataGrid from './DataGrid.jsx';
import { useEnquiryContext } from '@/contexts/EnquiryContext.jsx';

/**
 * EnquiryMasterPane Component
 * Main container for the left side of the screen (Master Pane).
 * Assembles the Header, FilterBar, and DataGrid.
 */
const EnquiryMasterPane = ({ isCompact }) => {
  const { enquiries } = useEnquiryContext();
  
  const [statusTab, setStatusTab] = useState('Active');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    type: [],
    revRole: [],
    advanced: false
  });

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter(enquiry => {
      // 1. Status Tab Filter
      if (enquiry.status !== statusTab) return false;

      // 2. Search Query Filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesCustomer = enquiry.customer?.name?.toLowerCase().includes(query);
        const matchesId = enquiry.id?.toLowerCase().includes(query);
        const matchesOverview = enquiry.leadOverview?.toLowerCase().includes(query);
        
        if (!matchesCustomer && !matchesId && !matchesOverview) return false;
      }

      // 3. Type Filter
      if (activeFilters.type.length > 0) {
        if (!activeFilters.type.includes(enquiry.type)) return false;
      }

      // 4. Rev Role Filter
      if (activeFilters.revRole.length > 0) {
        const enquiryRevRoles = enquiry.roles?.revenue?.map(r => r.id) || [];
        const hasMatch = activeFilters.revRole.some(roleId => enquiryRevRoles.includes(roleId));
        if (!hasMatch) return false;
      }

      return true;
    });
  }, [enquiries, statusTab, searchQuery, activeFilters]);

  return (
    <div className="flex flex-col h-full w-full bg-white border-r border-gray-200 overflow-hidden">
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
        setActiveFilters={setActiveFilters}
      />
      
      <DataGrid 
        isCompact={isCompact} 
        filteredEnquiries={filteredEnquiries}
      />
    </div>
  );
};

export default EnquiryMasterPane;
