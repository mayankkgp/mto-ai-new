import React from 'react';
import { EnquiryProvider } from './contexts/EnquiryContext.jsx';
import { AppLayout } from './components/AppLayout.jsx';
import { Toaster } from './components/ui/sonner.jsx';

export default function App() {
  return (
    <EnquiryProvider>
      <AppLayout>
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
          <p className="text-sm font-medium">Select an enquiry to view details</p>
          <p className="text-xs">Master/Detail layout implementation in progress...</p>
        </div>
      </AppLayout>
      <Toaster position="top-right" />
    </EnquiryProvider>
  );
}
