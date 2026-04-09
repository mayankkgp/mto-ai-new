import React from 'react';
import MasterHeader from './MasterHeader.jsx';
import FilterBar from './FilterBar.jsx';

/**
 * EnquiryMasterPane Component
 * Main container for the left side of the screen (Master Pane).
 * Assembles the Header, FilterBar, and eventually the DataGrid.
 */
const EnquiryMasterPane = ({ isCompact }) => {
  return (
    <div className="flex flex-col h-full w-full bg-white border-r border-gray-200">
      <MasterHeader isCompact={isCompact} />
      <FilterBar isCompact={isCompact} />
      
      {/* Temporary placeholder for the DataGrid */}
      <div className="flex-1 bg-gray-50 flex items-center justify-center italic text-gray-400">
        DataGrid Pending
      </div>
    </div>
  );
};

export default EnquiryMasterPane;
