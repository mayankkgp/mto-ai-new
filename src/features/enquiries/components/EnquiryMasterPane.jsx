import React from 'react';
import MasterHeader from './MasterHeader.jsx';
import FilterBar from './FilterBar.jsx';

import DataGrid from './DataGrid.jsx';

/**
 * EnquiryMasterPane Component
 * Main container for the left side of the screen (Master Pane).
 * Assembles the Header, FilterBar, and DataGrid.
 */
const EnquiryMasterPane = ({ isCompact }) => {
  return (
    <div className="flex flex-col h-full w-full bg-white border-r border-gray-200 overflow-hidden">
      <MasterHeader isCompact={isCompact} />
      <FilterBar isCompact={isCompact} />
      
      <DataGrid isCompact={isCompact} />
    </div>
  );
};

export default EnquiryMasterPane;
