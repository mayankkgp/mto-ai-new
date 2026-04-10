import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { useEnquiryContext } from '@/contexts/EnquiryContext.jsx';

/**
 * MasterHeader Component
 * Fixes visual deviations to match legacy UI:
 * 1. Default pill-style TabsList (removed variant="line")
 * 2. text-xs font-semibold on TabsTrigger with parenthesized counts
 * 3. CREATE NEW ENQUIRY text in all caps
 * 4. text-xs font-bold on the Create Button
 */
const MasterHeader = ({ isCompact, statusTab, setStatusTab }) => {
  const { enquiries, selectEnquiry } = useEnquiryContext();

  const counts = {
    Active: enquiries.filter(e => e.status === 'Active').length,
    Converted: enquiries.filter(e => e.status === 'Converted').length,
    Dropped: enquiries.filter(e => e.status === 'Dropped').length,
  };

  return (
    <header className="flex items-center justify-between h-header-fluid px-nav-fluid border-b bg-background sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <Tabs value={statusTab} onValueChange={setStatusTab} className="w-auto">
          <TabsList className="h-8">
            <TabsTrigger 
              value="Active" 
              className="text-xs font-semibold transition-none px-4 text-gray-500 hover:text-gray-700 data-active:text-primary"
            >
              Active ({counts.Active})
            </TabsTrigger>
            <TabsTrigger 
              value="Converted" 
              className="text-xs font-semibold transition-none px-4 text-gray-500 hover:text-gray-700 data-active:text-primary"
            >
              Converted ({counts.Converted})
            </TabsTrigger>
            <TabsTrigger 
              value="Dropped" 
              className="text-xs font-semibold transition-none px-4 text-gray-500 hover:text-gray-700 data-active:text-primary"
            >
              Dropped ({counts.Dropped})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Button 
        onClick={() => selectEnquiry(null)}
        size={isCompact ? "icon" : "default"}
        className="gap-2 text-xs font-bold"
      >
        <Plus className="h-4 w-4" />
        {!isCompact && <span>CREATE NEW ENQUIRY</span>}
      </Button>
    </header>
  );
};

export default MasterHeader;
