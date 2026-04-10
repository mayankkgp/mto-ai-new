import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { useEnquiryContext } from '@/contexts/EnquiryContext.jsx';
import { cn } from '@/lib/utils.js';

/**
 * MasterHeader Component
 * Fixes visual deviations to match legacy UI:
 * 1. Default pill-style TabsList (removed variant="line")
 * 2. text-xs font-semibold on TabsTrigger with parenthesized counts
 * 3. CREATE NEW ENQUIRY text in all caps
 * 4. text-xs font-bold on the Create Button
 */
const MasterHeader = ({ isCompact, statusTab, setStatusTab }) => {
  const { enquiries, startCreating } = useEnquiryContext();

  const counts = {
    Active: enquiries.filter(e => e.status === 'Active').length,
    Converted: enquiries.filter(e => e.status === 'Converted').length,
    Dropped: enquiries.filter(e => e.status === 'Dropped').length,
  };

  return (
    <header className="flex items-center justify-between h-header-fluid px-nav-fluid border-b bg-background sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
          {['Active', 'Converted', 'Dropped'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusTab(status)}
              className={cn(
                "px-4 py-1 text-xs font-semibold rounded-md transition-all",
                statusTab === status 
                  ? "bg-white text-primary shadow-sm" 
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              {status} ({counts[status]})
            </button>
          ))}
        </div>
      </div>

      <Button 
        onClick={startCreating}
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
