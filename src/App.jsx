import React from 'react';
import { EnquiryProvider } from '@/contexts/EnquiryContext.jsx';
import { AppLayout } from '@/components/AppLayout.jsx';
import { Toaster } from '@/components/ui/sonner.jsx';
import EnquiryMasterPane from '@/features/enquiries/components/EnquiryMasterPane.jsx';

export default function App() {
  return (
    <EnquiryProvider>
      <AppLayout>
        <EnquiryMasterPane />
      </AppLayout>
      <Toaster position="top-right" />
    </EnquiryProvider>
  );
}
