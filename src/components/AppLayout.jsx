import React, { useEffect } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip.jsx';
import { GlobalSidebar } from './layout/GlobalSidebar.jsx';
import { useUIState } from '@/contexts/UIStateContext.jsx';
import { useModals } from '@/contexts/ModalContext.jsx';
import DropEnquiryModal from '@/features/enquiries/components/modals/DropEnquiryModal.jsx';
import ConvertEnquiryModal from '@/features/enquiries/components/modals/ConvertEnquiryModal.jsx';
import ReopenEnquiryModal from '@/features/enquiries/components/modals/ReopenEnquiryModal.jsx';
import Lightbox from '@/components/ui/lightbox.jsx';

const MainWorkspace = ({ children }) => {
  return (
    <main className="flex-1 h-screen overflow-hidden bg-white flex flex-col relative">
      {children}
    </main>
  );
};

export const AppLayout = ({ config, children }) => {
  const { 
    activeModule, 
    setActiveModule, 
    isCollapsed, 
    setIsCollapsed, 
    setIsCompact,
    isActionLoading
  } = useUIState();

  const { activeModal, modalProps, closeModal } = useModals();
  
  // Mock user data - in a real app this might come from an AuthContext
  const user = {
    name: "Mayank Kumar",
    role: "Revenue Manager",
    initials: "MK"
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const sidebarWidth = isCollapsed ? 64 : 200;
      const availableWidth = width - sidebarWidth;
      setIsCompact(availableWidth < 1000);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isCollapsed, setIsCompact]);

  return (
    <TooltipProvider>
      <div className="flex h-screen w-full overflow-hidden bg-[#F9FAFB]">
        <GlobalSidebar 
          config={config}
          isCollapsed={isCollapsed} 
          setIsCollapsed={setIsCollapsed} 
          activeTab={activeModule}
          setActiveTab={setActiveModule}
          user={user}
        />
        <MainWorkspace>
          {children}
        </MainWorkspace>

        <DropEnquiryModal 
          isOpen={activeModal === 'DROP_ENQUIRY'}
          onClose={closeModal}
          isProcessing={isActionLoading}
          {...modalProps}
        />
        <ConvertEnquiryModal 
          isOpen={activeModal === 'CONVERT_ENQUIRY'}
          onClose={closeModal}
          isProcessing={isActionLoading}
          {...modalProps}
        />
        <ReopenEnquiryModal 
          isOpen={activeModal === 'REOPEN_ENQUIRY'}
          onClose={closeModal}
          isProcessing={isActionLoading}
          {...modalProps}
        />

        <Lightbox 
          isOpen={activeModal === 'FILE_LIGHTBOX'} 
          onClose={closeModal} 
          {...modalProps} 
        />
      </div>
    </TooltipProvider>
  );
};
