import React, { useState, useMemo } from 'react';
import MasterHeader from './MasterHeader.jsx';
import FilterBar from './FilterBar.jsx';
import DataGrid from './DataGrid.jsx';
import { useUIState } from '@/contexts/UIStateContext.jsx';
import { useEnquiryList } from '@/contexts/EnquiryListContext.jsx';
import { useEnquiryDetail } from '@/contexts/EnquiryDetailContext.jsx';
import MasterPane from '@/components/ui/master-pane.jsx';

/**
 * EnquiryMasterPane Component
 * Main container for the left side of the screen (Master Pane).
 * Assembles the Header, FilterBar, and DataGrid.
 */
const EnquiryMasterPane = () => {
  const { enquiries } = useEnquiryList();
  const { isCreating, statusTab, setStatusTab, isCompact: isCompactProp } = useUIState();
  const { activeEnquiryId } = useEnquiryDetail();
  
  // Force compact mode if an enquiry is active or being created (Detail Pane is open)
  const isCompact = (activeEnquiryId || isCreating) ? true : isCompactProp;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    type: [],
    revRole: [],
    advanced: false,
    channel: '',
    supply: [],
    leadDateStart: '',
    leadDateEnd: '',
    revDueStart: '',
    revDueEnd: '',
    supDueStart: '',
    supDueEnd: '',
    minExpValue: '',
    maxExpValue: '',
    city: '',
    source: ''
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

      // 5. Advanced Filters
      // Channel
      if (activeFilters.channel && enquiry.leadChannel !== activeFilters.channel) return false;

      // Supply (Array of names)
      if (activeFilters.supply.length > 0) {
        const enquirySupplyNames = enquiry.roles?.supply?.map(s => s.name) || [];
        const hasSupplyMatch = activeFilters.supply.some(name => enquirySupplyNames.includes(name));
        if (!hasSupplyMatch) return false;
      }

      // City
      if (activeFilters.city && enquiry.customer?.city !== activeFilters.city) return false;

      // Source
      if (activeFilters.source && !enquiry.source?.toLowerCase().includes(activeFilters.source.toLowerCase())) return false;

      // Expected Value Range
      const expValue = enquiry.commercials?.expectedValue || 0;
      if (activeFilters.minExpValue && expValue < parseFloat(activeFilters.minExpValue)) return false;
      if (activeFilters.maxExpValue && expValue > parseFloat(activeFilters.maxExpValue)) return false;

      // Date Ranges (Lead Date)
      const leadDate = enquiry.createdOn ? new Date(enquiry.createdOn).getTime() : null;
      if (activeFilters.leadDateStart && leadDate < new Date(activeFilters.leadDateStart).getTime()) return false;
      if (activeFilters.leadDateEnd) {
        const endDate = new Date(activeFilters.leadDateEnd);
        endDate.setHours(23, 59, 59, 999);
        if (leadDate > endDate.getTime()) return false;
      }

      // Task Due Date Ranges (Rev Due / Sup Due)
      const getEarliestDueDate = (tasks) => {
        if (!tasks || tasks.length === 0) return null;
        const incomplete = tasks.filter(t => !t.isCompleted);
        if (incomplete.length === 0) return null;
        return Math.min(...incomplete.map(t => new Date(t.dueDate).getTime()));
      };

      if (activeFilters.revDueStart || activeFilters.revDueEnd) {
        const revDue = getEarliestDueDate(enquiry.tasks?.revenue);
        if (!revDue) return false;
        if (activeFilters.revDueStart && revDue < new Date(activeFilters.revDueStart).getTime()) return false;
        if (activeFilters.revDueEnd) {
          const endDate = new Date(activeFilters.revDueEnd);
          endDate.setHours(23, 59, 59, 999);
          if (revDue > endDate.getTime()) return false;
        }
      }

      if (activeFilters.supDueStart || activeFilters.supDueEnd) {
        const supDue = getEarliestDueDate(enquiry.tasks?.supply);
        if (!supDue) return false;
        if (activeFilters.supDueStart && supDue < new Date(activeFilters.supDueStart).getTime()) return false;
        if (activeFilters.supDueEnd) {
          const endDate = new Date(activeFilters.supDueEnd);
          endDate.setHours(23, 59, 59, 999);
          if (supDue > endDate.getTime()) return false;
        }
      }

      return true;
    });
  }, [enquiries, statusTab, searchQuery, activeFilters]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setActiveFilters({
      type: [],
      revRole: [],
      advanced: false,
      channel: '',
      supply: [],
      leadDateStart: '',
      leadDateEnd: '',
      revDueStart: '',
      revDueEnd: '',
      supDueStart: '',
      supDueEnd: '',
      minExpValue: '',
      maxExpValue: '',
      city: '',
      source: ''
    });
  };

  return (
    <MasterPane variant="gallery-master-pane" className="flex flex-col overflow-hidden">
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
        clearAllFilters={clearAllFilters}
      />
      
      <DataGrid 
        isCompact={isCompact} 
        filteredEnquiries={filteredEnquiries}
      />
    </MasterPane>
  );
};

export default EnquiryMasterPane;
