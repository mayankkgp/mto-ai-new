import React from 'react';
import { UIStateProvider, useUIState } from '@/contexts/UIStateContext.jsx';
import { ReferenceDataProvider } from '@/contexts/ReferenceDataContext.jsx';
import { EnquiryListProvider } from '@/contexts/EnquiryListContext.jsx';
import { EnquiryDetailProvider } from '@/contexts/EnquiryDetailContext.jsx';
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
            <AppContent />
            <Toaster position="top-right" />
          </EnquiryDetailProvider>
        </EnquiryListProvider>
      </ReferenceDataProvider>
    </UIStateProvider>
  );
}
