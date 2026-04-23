import React from 'react';
import { UIStateProvider, useUIState } from '@/contexts/UIStateContext.jsx';
import { ReferenceDataProvider } from '@/contexts/ReferenceDataContext.jsx';
import { EnquiryListProvider } from '@/contexts/EnquiryListContext.jsx';
import { EnquiryDetailProvider } from '@/contexts/EnquiryDetailContext.jsx';
import { ModalProvider } from '@/contexts/ModalContext.jsx';
import { AppLayout } from '@/components/AppLayout.jsx';
import { Toaster } from '@/components/ui/sonner.jsx';
import EnquiriesModule from '@/features/enquiries/EnquiriesModule.jsx';
import { 
  Hexagon, 
  LayoutDashboard, 
  Inbox, 
  CheckSquare, 
  BarChart2,
  Settings
} from 'lucide-react';

const SIDEBAR_CONFIG = {
  brand: {
    name: "Fabrito MTO",
    icon: Hexagon
  },
  navItems: [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'enquiries', label: 'Enquiries', icon: Inbox },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'reports', label: 'Reports', icon: BarChart2 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]
};

function AppContent() {
  const { activeModule } = useUIState();

  return (
    <AppLayout config={SIDEBAR_CONFIG}>
      {activeModule === 'enquiries' && <EnquiriesModule />}
      {activeModule !== 'enquiries' && (
        <div className="p-8 text-gray-500">Module: {activeModule}</div>
      )}
    </AppLayout>
  );
}

export default function App() {
  return (
    <UIStateProvider>
      <ReferenceDataProvider>
        <EnquiryListProvider>
          <EnquiryDetailProvider>
            <ModalProvider>
              <AppContent />
              <Toaster 
                position="top-right" 
                offset={{ top: '80px', right: '24px' }}
                duration={5000}
                closeButton
                toastOptions={{
                  classNames: {
                    error: 'bg-red-50 border border-red-100 text-red-900 shadow-xl rounded-xl p-4',
                    title: 'text-sm font-bold',
                    description: 'text-xs font-medium text-red-700 mt-1',
                    closeButton: 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
                  }
                }}
              />
            </ModalProvider>
          </EnquiryDetailProvider>
        </EnquiryListProvider>
      </ReferenceDataProvider>
    </UIStateProvider>
  );
}
