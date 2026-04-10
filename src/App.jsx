import React from 'react';
import { EnquiryProvider, useEnquiryContext } from '@/contexts/EnquiryContext.jsx';
import { AppLayout } from '@/components/AppLayout.jsx';
import { Toaster } from '@/components/ui/sonner.jsx';
import { cn } from '@/lib/utils.js';
import EnquiryMasterPane from '@/features/enquiries/components/EnquiryMasterPane.jsx';
import EnquiryDetailPane from '@/features/enquiries/components/EnquiryDetailPane.jsx';

function AppContent() {
  const { activeEnquiryId, isCreating, closePane } = useEnquiryContext();
  const isPaneOpen = !!activeEnquiryId || isCreating;

  return (
    <AppLayout>
      {/* AppLayout will pass isCompact to this child */}
      <div className="flex h-full w-full overflow-hidden">
        {/* Master Pane: Always visible, but width changes if Detail Pane is open */}
        <div className={cn(
          "transition-all duration-300 shrink-0",
          isPaneOpen ? "w-[35%]" : "w-full"
        )}>
          <EnquiryMasterPane />
        </div>

        {/* Detail Pane: Animated entry/exit */}
        {isPaneOpen && (
          <div className="w-[65%] shrink-0">
            <EnquiryDetailPane 
              activeEnquiryId={activeEnquiryId} 
              isCreating={isCreating}
              onClose={closePane} 
            />
          </div>
        )}
      </div>
    </AppLayout>
  );
}

export default function App() {
  return (
    <EnquiryProvider>
      <AppContent />
      <Toaster position="top-right" />
    </EnquiryProvider>
  );
}
