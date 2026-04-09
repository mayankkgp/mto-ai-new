import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { useEnquiryContext } from '@/contexts/EnquiryContext.jsx';

const MasterHeader = ({ isCompact }) => {
  const { enquiries, selectEnquiry } = useEnquiryContext();

  const counts = {
    Active: enquiries.filter(e => e.status === 'Active').length,
    Converted: enquiries.filter(e => e.status === 'Converted').length,
    Dropped: enquiries.filter(e => e.status === 'Dropped').length,
  };

  return (
    <header className="flex items-center justify-between h-header-fluid px-nav-fluid border-b bg-background sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <Tabs defaultValue="Active" className="w-auto">
          <TabsList variant="line" className="h-auto p-0 gap-6">
            <TabsTrigger 
              value="Active" 
              className="px-0 py-nav-fluid text-sm font-medium transition-none"
            >
              Active <span className="ml-1.5 text-muted-foreground font-normal">{counts.Active}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="Converted" 
              className="px-0 py-nav-fluid text-sm font-medium transition-none"
            >
              Converted <span className="ml-1.5 text-muted-foreground font-normal">{counts.Converted}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="Dropped" 
              className="px-0 py-nav-fluid text-sm font-medium transition-none"
            >
              Dropped <span className="ml-1.5 text-muted-foreground font-normal">{counts.Dropped}</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Button 
        onClick={() => selectEnquiry(null)}
        size={isCompact ? "icon" : "default"}
        className="gap-2"
      >
        <Plus className="h-4 w-4" />
        {!isCompact && <span>Create New</span>}
      </Button>
    </header>
  );
};

export default MasterHeader;
