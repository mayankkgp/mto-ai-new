import React from 'react';
import { X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { cn } from '@/lib/utils.js';
import PaneHeader from '@/components/ui/pane-header.jsx';

/**
 * DetailHeader Component
 * A generic top sticky bar for Detail Panes.
 * Supports a title, badges, avatar groups, and dynamic actions.
 */
const DetailHeader = ({ 
  title, 
  badges = [], 
  avatarGroups = [], 
  actions = [], 
  onClose 
}) => {
  return (
    <PaneHeader variant="detail-header-split" className="flex items-center justify-between sticky top-0 z-50">
      {/* 1. Left Group (Title, Badges & Avatars) */}
      <div className="flex items-center gap-3">
        {title && (
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-tight">
            {title}
          </h2>
        )}
        
        {badges.map((badge, idx) => (
          <Badge 
            key={idx}
            className={cn(
              "px-2 py-0.5 rounded text-[10px] font-bold uppercase border shadow-none",
              badge.className
            )}
          >
            {badge.label}
          </Badge>
        ))}

        {avatarGroups.length > 0 && (
          <div className="hidden sm:flex items-center gap-2 border-l border-gray-300 pl-3 shrink-0">
            {avatarGroups.map((group, gIdx) => (
              <React.Fragment key={gIdx}>
                {gIdx > 0 && <div className="w-px h-4 bg-[#E5E7EB] mx-1" />}
                <div className="flex gap-1">
                  {group.initials?.map((initials, idx) => (
                    <div 
                      key={`${gIdx}-${idx}`}
                      className="w-5 h-5 rounded-full bg-gray-100 text-gray-600 border border-gray-200 flex items-center justify-center text-[9px] font-bold z-10 relative"
                    >
                      {initials}
                    </div>
                  ))}
                </div>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* 2. Right Group (Actions) */}
      <div className="flex items-center gap-2">
        {actions.map((action, idx) => {
          if (action.hidden) return null;
          
          if (action.type === 'separator') {
            return <div key={idx} className="w-px h-6 bg-gray-200 mx-1" />;
          }

          const Icon = action.icon;
          
          return (
            <Button 
              key={action.id || idx}
              variant={action.variant || "default"}
              onClick={action.onClick}
              disabled={action.disabled || action.isLoading}
              className={cn("gap-1.5", action.className)}
            >
              {action.isLoading 
                ? <Loader2 size={14} className="animate-spin" /> 
                : Icon && <Icon size={14} />
              }
              <span>{action.isLoading ? action.loadingText : action.label}</span>
            </Button>
          );
        })}

        <Button 
          variant="pane-close"
          size="icon"
          onClick={onClose}
        >
          <X size={18} />
        </Button>
      </div>
    </PaneHeader>
  );
};

export default DetailHeader;
