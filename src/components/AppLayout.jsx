import React, { useState, useEffect } from 'react';
import { useEnquiryContext } from '@/contexts/EnquiryContext';
import { TooltipProvider } from '@/components/ui/tooltip';
import { GlobalSidebar } from './layout/GlobalSidebar';

const MainWorkspace = ({ children }) => {
  return (
    <main className="flex-1 h-screen overflow-hidden bg-white flex flex-col relative">
      {children}
    </main>
  );
};

export const AppLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('enquiries');
  const { activeEnquiryId } = useEnquiryContext();

  // Derived state for responsive behaviors
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Logic for isCompact: if sidebar is open and screen is small, or just screen is small
      const width = window.innerWidth;
      const sidebarWidth = isCollapsed ? 64 : 200;
      const availableWidth = width - sidebarWidth;
      setIsCompact(availableWidth < 1000);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isCollapsed]);

  return (
    <TooltipProvider>
      <div className="flex h-screen w-full overflow-hidden bg-[#F9FAFB]">
        <GlobalSidebar 
          isCollapsed={isCollapsed} 
          setIsCollapsed={setIsCollapsed} 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <MainWorkspace>
          {/* We pass isCompact and displayEnquiry down via context or props if needed */}
          {React.Children.map(children, child => {
            if (React.isValidElement(child) && typeof child.type !== 'string') {
              return React.cloneElement(child, { isCompact, displayEnquiry: !!activeEnquiryId });
            }
            return child;
          })}
        </MainWorkspace>
      </div>
    </TooltipProvider>
  );
};
