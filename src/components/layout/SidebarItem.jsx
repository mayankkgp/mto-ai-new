import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils.js';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip.jsx';

/**
 * SidebarItem Component
 * Renders an individual navigation item with tooltip and active indicator.
 */
const SidebarItem = ({ item, isCollapsed, isActive, onClick }) => {
  const Icon = item.icon;
  
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger
        className={cn(
          "w-full flex items-center justify-start gap-4 px-4 py-nav-fluid group relative transition-colors cursor-pointer outline-none rounded-lg",
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
      </TooltipTrigger>
      {isCollapsed && (
        <TooltipContent side="right" className="bg-[#151619] text-white border-white/10">
          {item.label}
        </TooltipContent>
      )}
    </Tooltip>
  );
};

export default SidebarItem;
