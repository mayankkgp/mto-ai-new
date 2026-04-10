import React from 'react';
import { EnquiryProvider, useEnquiryContext } from '@/contexts/EnquiryContext.jsx';
import { AppLayout } from '@/components/AppLayout.jsx';
import { Toaster } from '@/components/ui/sonner.jsx';
import EnquiryMasterPane from '@/features/enquiries/components/EnquiryMasterPane.jsx';
import EnquiryDetailPane from '@/features/enquiries/components/EnquiryDetailPane.jsx';

function AppContent() {
  const { activeEnquiryId, selectEnquiry } = useEnquiryContext();

  return (
    <AppLayout>
      {/* AppLayout will pass isCompact to this child */}
      <div className="flex h-full w-full overflow-hidden">
        {/* Master Pane: Always visible, but width changes if Detail Pane is open */}
        <div className={activeEnquiryId ? "w-[350px] min-[height:801px]:w-[450px] shrink-0" : "w-full"}>
          <EnquiryMasterPane />
        </div>

        {/* Detail Pane: Animated entry/exit */}
        <EnquiryDetailPane 
          activeEnquiryId={activeEnquiryId} 
          onClose={() => selectEnquiry(null)} 
        />
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
