import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { useUIState } from '@/contexts/UIStateContext.jsx';
import { useEnquiryList } from '@/contexts/EnquiryListContext.jsx';
import PaneHeader from '@/components/ui/pane-header.jsx';
import SegmentedControl from '@/components/ui/segmented-control.jsx';

/**
 * MasterHeader Component
 * Uses dynamic PaneHeader primitive for standardized height and layout.
 */
const MasterHeader = ({ isCompact, statusTab, setStatusTab }) => {
  const { enquiries } = useEnquiryList();
  const { startCreating } = useUIState();

  const counts = {
    Active: enquiries.filter(e => e.status === 'Active').length,
    Converted: enquiries.filter(e => e.status === 'Converted').length,
    Dropped: enquiries.filter(e => e.status === 'Dropped').length,
  };

  return (
    <PaneHeader 
      variant="master-header" 
      className="flex items-center justify-between sticky top-0 z-10"
    >
      <SegmentedControl
        value={statusTab}
        onValueChange={setStatusTab}
        options={['Active', 'Converted', 'Dropped'].map(s => ({ value: s, label: `${s} (${counts[s]})` }))}
        variant="header-toggle"
      />

      <Button 
        onClick={startCreating}
        size={isCompact ? "icon" : "default"}
        className="gap-2"
      >
        <Plus className="h-4 w-4" />
        {!isCompact && <span>CREATE NEW ENQUIRY</span>}
      </Button>
    </PaneHeader>
  );
};

export default MasterHeader;
