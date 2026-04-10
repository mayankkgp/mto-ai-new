import React from 'react';
import { X, Save, CheckCircle2, Ban } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { getUserInitials } from '@/utils/formatters.js';
import { cn } from '@/lib/utils.js';

/**
 * DetailHeader Component
 * The top sticky bar for the Enquiry Detail Pane.
 * Implements Identity Group, Status Badge, and Action Group.
 */
const DetailHeader = ({ enquiry, onClose, onSave, onConvert, onDrop }) => {
  if (!enquiry) return null;

  const revInitials = getUserInitials(enquiry.roles?.revenue?.map(r => r.id) || []);
  const supInitials = getUserInitials(enquiry.roles?.supply?.map(r => r.id) || []);

  const getStatusClasses = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]';
      case 'Converted':
        return 'bg-[#F3F4F6] text-[#374151] border-[#E5E7EB]';
      case 'Dropped':
        return 'bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <header className="bg-gray-50 border-b border-gray-200 flex items-center justify-between shrink-0 sticky top-0 z-50 h-header-fluid px-nav-fluid py-nav-fluid">
      {/* 1. Left Group (Identity, Status & Avatars) */}
      <div className="flex items-center gap-3">
        <h2 className="text-sm font-bold text-gray-800 uppercase tracking-tight">
          {enquiry.id}
        </h2>
        
        <Badge className={cn(
          "px-2 py-0.5 rounded text-[10px] font-bold uppercase border shadow-none",
          getStatusClasses(enquiry.status)
        )}>
          {enquiry.status}
        </Badge>

        <div className="hidden sm:flex items-center gap-2 border-l border-gray-300 pl-3 shrink-0">
          {/* Revenue Avatars */}
          <div className="flex gap-1">
            {revInitials?.map((initials, idx) => (
              <div 
                key={`rev-${idx}`}
                className="w-5 h-5 rounded-full bg-gray-100 text-gray-600 border border-gray-200 flex items-center justify-center text-[9px] font-bold z-10 relative"
              >
                {initials}
              </div>
            ))}
          </div>

          <div className="w-px h-4 bg-[#E5E7EB] mx-1" />

          {/* Supply Avatars */}
          <div className="flex gap-1">
            {supInitials?.map((initials, idx) => (
              <div 
                key={`sup-${idx}`}
                className="w-5 h-5 rounded-full bg-gray-100 text-gray-600 border border-gray-200 flex items-center justify-center text-[9px] font-bold z-10 relative"
              >
                {initials}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Right Group (Actions) */}
      <div className="flex items-center gap-2">
        <Button 
          onClick={onConvert}
          className="px-3 py-1.5 h-auto text-[11px] font-bold rounded flex items-center gap-1.5 bg-[#111827] hover:bg-[#111827]/90 text-white border-none"
        >
          <CheckCircle2 size={14} />
          <span>CONVERT</span>
        </Button>

        <Button 
          onClick={onDrop}
          variant="ghost"
          className="px-3 py-1.5 h-auto text-[11px] font-bold rounded flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 border-none"
        >
          <Ban size={14} />
          <span>DROP</span>
        </Button>

        <div className="w-px h-6 bg-gray-200 mx-1" />

        <Button 
          onClick={onSave}
          className="px-3 py-1.5 h-auto text-[11px] font-bold rounded flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white border-none"
        >
          <Save size={14} />
          <span>SAVE</span>
        </Button>

        <Button 
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="p-1.5 h-auto w-auto rounded-full hover:bg-gray-200 text-gray-500 transition-colors"
        >
          <X size={18} />
        </Button>
      </div>
    </header>
  );
};

export default DetailHeader;
