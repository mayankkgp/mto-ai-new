import React from 'react';
import { motion } from 'motion/react';
import { 
  Hexagon, 
  LayoutDashboard, 
  Inbox, 
  CheckSquare, 
  BarChart2, 
  Settings, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { cn } from '@/lib/utils.js';
import { Button } from '@/components/ui/button.jsx';
import { Avatar, AvatarFallback } from '@/components/ui/avatar.jsx';
import SidebarItem from './SidebarItem.jsx';

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

export const GlobalSidebar = ({ isCollapsed, setIsCollapsed, activeTab, setActiveTab, user }) => {
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
              {user?.initials || '??'}
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <p className="text-xs font-semibold truncate">{user?.name || 'User'}</p>
              <p className="text-[10px] text-gray-500 truncate">{user?.role || 'Role'}</p>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
};

export default GlobalSidebar;
