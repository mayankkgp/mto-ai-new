import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Hexagon, 
  LayoutDashboard, 
  Inbox, 
  CheckSquare, 
  BarChart2, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Search,
  Plus,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useEnquiryContext } from '@/contexts/EnquiryContext';

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
  ],
  user: {
    name: "Mayank Kumar",
    role: "Revenue Manager",
    initials: "MK"
  }
};

const SidebarItem = ({ item, isCollapsed, isActive, onClick }) => {
  const Icon = item.icon;
  
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-4 px-4 py-nav-fluid group relative transition-colors",
            isActive ? "text-white bg-white/10" : "text-gray-400 hover:text-white hover:bg-white/5",
            isCollapsed && "justify-center px-0"
          )}
          onClick={() => onClick(item.id)}
        >
          <Icon className="w-[18px] h-[18px] shrink-0" />
          {!isCollapsed && (
            <span className="text-xs font-medium tracking-wide uppercase truncate">
              {item.label}
            </span>
          )}
          {isActive && (
            <motion.div
              layoutId="activeIndicator"
              className="absolute left-0 top-0 w-1 h-full bg-[#818CF8]"
              initial={false}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </Button>
      </TooltipTrigger>
      {isCollapsed && (
        <TooltipContent side="right" className="bg-[#151619] text-white border-white/10">
          {item.label}
        </TooltipContent>
      )}
    </Tooltip>
  );
};

const GlobalSidebar = ({ isCollapsed, setIsCollapsed, activeTab, setActiveTab }) => {
  const BrandIcon = SIDEBAR_CONFIG.brand.icon;

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 64 : 200 }}
      className="bg-[#151619] text-white flex flex-col border-r border-white/10 shrink-0 h-screen z-50"
    >
      {/* Brand Header */}
      <div className="h-header-fluid p-header-fluid flex items-center justify-between border-b border-white/5">
        {!isCollapsed && (
          <div className="flex items-center gap-2 overflow-hidden">
            <BrandIcon className="w-5 h-5 text-primary shrink-0" />
            <span className="font-bold text-sm truncate">{SIDEBAR_CONFIG.brand.name}</span>
          </div>
        )}
        {isCollapsed && <BrandIcon className="w-5 h-5 text-primary mx-auto" />}
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-gray-400 hover:text-white hover:bg-white/10 hidden [@media(min-height:600px)]:flex"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 space-y-1 overflow-y-auto no-scrollbar">
        {SIDEBAR_CONFIG.navItems.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            isCollapsed={isCollapsed}
            isActive={activeTab === item.id}
            onClick={setActiveTab}
          />
        ))}
      </nav>

      {/* User Footer */}
      <div className="p-header-fluid border-t border-white/5">
        <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
          <Avatar className="w-8 h-8 shrink-0 border border-white/10">
            <AvatarFallback className="bg-primary text-white text-[10px]">
              {SIDEBAR_CONFIG.user.initials}
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <p className="text-xs font-semibold truncate">{SIDEBAR_CONFIG.user.name}</p>
              <p className="text-[10px] text-gray-500 truncate">{SIDEBAR_CONFIG.user.role}</p>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
};

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
            if (React.isValidElement(child)) {
              return React.cloneElement(child, { isCompact, displayEnquiry: !!activeEnquiryId });
            }
            return child;
          })}
        </MainWorkspace>
      </div>
    </TooltipProvider>
  );
};
