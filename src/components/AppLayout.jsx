import React, { useState, useEffect } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip.jsx';
import { GlobalSidebar } from './layout/GlobalSidebar.jsx';

const MainWorkspace = ({ children }) => {
  return (
    <main className="flex-1 h-screen overflow-hidden bg-white flex flex-col relative">
      {children}
    </main>
  );
};

export const AppLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activeTab, setActiveTab] = useState('enquiries');
  
  // Mock user data - in a real app this might come from an AuthContext
  const user = {
    name: "Mayank Kumar",
    role: "Revenue Manager",
    initials: "MK"
  };

  // Derived state for responsive behaviors
  const [isCompact, setIsCompact] = useState(false);

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
  }, [isCollapsed]);

  const renderChildren = (children) => {
    return React.Children.map(children, child => {
      if (!React.isValidElement(child)) return child;
      
      if (typeof child.type !== 'string') {
        return React.cloneElement(child, { isCompact });
      }
      
      if (child.props.children) {
        return React.cloneElement(child, {
          children: renderChildren(child.props.children)
        });
      }
      
      return child;
    });
  };

  return (
    <TooltipProvider>
      <div className="flex h-screen w-full overflow-hidden bg-[#F9FAFB]">
        <GlobalSidebar 
          isCollapsed={isCollapsed} 
          setIsCollapsed={setIsCollapsed} 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          user={user}
        />
        <MainWorkspace>
          {renderChildren(children)}
        </MainWorkspace>
      </div>
    </TooltipProvider>
  );
};
