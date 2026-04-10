import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table.jsx';
import { useEnquiryContext } from '@/contexts/EnquiryContext.jsx';
import { mockUsers } from '@/mockData.js';
import { cn } from '@/lib/utils.js';
import { ArrowUpDown } from 'lucide-react';

/**
 * DataGrid Component
 * Implements the Master Data Grid for enquiries with sticky columns and urgency logic.
 * Refactored for pixel-perfect legacy UI sync.
 */
const DataGrid = ({ isCompact }) => {
  const { enquiries, activeEnquiryId, selectEnquiry, isGlobalLoading } = useEnquiryContext();

  // Helper: Format Indian Currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Helper: Get User Initials from IDs
  const getUserInitials = (userIds) => {
    if (!userIds || userIds.length === 0) return null;
    return userIds.map(id => {
      const user = mockUsers.find(u => u.id === id);
      return user ? user.initials : null;
    }).filter(Boolean);
  };

  // Helper: Get Urgency Info based on due date
  const getUrgencyInfo = (tasks) => {
    if (!tasks || tasks.length === 0) return { text: '-', color: 'text-gray-400' };
    
    const incompleteTasks = tasks.filter(t => !t.isCompleted);
    if (incompleteTasks.length === 0) return { text: '-', color: 'text-gray-400' };

    // Find earliest due date
    const earliestTask = incompleteTasks.reduce((earliest, current) => {
      return new Date(current.dueDate) < new Date(earliest.dueDate) ? current : earliest;
    });

    const dueDate = new Date(earliestTask.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { text: `Overdue by ${Math.abs(diffDays)}d`, color: 'text-red-600 font-bold' };
    }
    if (diffDays === 0) {
      return { text: 'Today', color: 'text-orange-600 font-bold' };
    }
    if (diffDays === 1) {
      return { text: 'Tomorrow', color: 'text-primary font-medium' };
    }
    if (diffDays > 1 && diffDays <= 7) {
      return { text: `In ${diffDays} days`, color: 'text-gray-600' };
    }
    
    return { 
      text: new Date(earliestTask.dueDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }), 
      color: 'text-gray-400' 
    };
  };

  // Helper: Format Date for display
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: '2-digit'
    });
  };

  if (isGlobalLoading) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground animate-pulse">
        Loading enquiries...
      </div>
    );
  }

  if (enquiries.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground italic">
        No enquiries found.
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto no-scrollbar relative">
      <Table className="border-separate border-spacing-0 min-w-[1000px]">
        <TableHeader className="sticky top-0 z-30 bg-gray-50 border-b border-gray-200">
          <TableRow className="hover:bg-transparent border-b text-gray-500">
            {/* 1. Customer (Sticky) */}
            <TableHead className="h-auto sticky left-0 z-40 bg-white shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] border-r border-gray-200 px-table-fluid py-0.5 min-[height:801px]:py-1 text-[10px] font-bold uppercase tracking-wider text-gray-500 whitespace-nowrap min-w-[180px] group">
              <div className="flex items-center gap-1">
                Customer
                <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-50 transition-opacity" />
              </div>
            </TableHead>
            {/* 2. Overview */}
            <TableHead className="h-auto px-table-fluid py-0.5 min-[height:801px]:py-1 border-r border-gray-200 text-[10px] font-bold uppercase tracking-wider text-gray-500 whitespace-nowrap cursor-pointer hover:bg-gray-100 transition-colors group min-w-[250px]">
              <div className="flex items-center gap-1">
                Overview
                <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-50 transition-opacity" />
              </div>
            </TableHead>
            {/* 3. Rev Role */}
            <TableHead className="h-auto px-table-fluid py-0.5 min-[height:801px]:py-1 border-r border-gray-200 text-[10px] font-bold uppercase tracking-wider text-gray-500 whitespace-nowrap cursor-pointer hover:bg-gray-100 transition-colors group text-center min-w-[100px]">
              <div className="flex items-center justify-center gap-1">
                Rev Role
                <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-50 transition-opacity" />
              </div>
            </TableHead>
            {/* 4. ID */}
            <TableHead className="h-auto px-table-fluid py-0.5 min-[height:801px]:py-1 border-r border-gray-200 text-[10px] font-bold uppercase tracking-wider text-gray-500 whitespace-nowrap cursor-pointer hover:bg-gray-100 transition-colors group min-w-[120px]">
              <div className="flex items-center gap-1">
                ID
                <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-50 transition-opacity" />
              </div>
            </TableHead>
            {/* 5. Type */}
            <TableHead className="h-auto px-table-fluid py-0.5 min-[height:801px]:py-1 border-r border-gray-200 text-[10px] font-bold uppercase tracking-wider text-gray-500 whitespace-nowrap cursor-pointer hover:bg-gray-100 transition-colors group text-center min-w-[80px]">
              <div className="flex items-center justify-center gap-1">
                Type
                <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-50 transition-opacity" />
              </div>
            </TableHead>
            {/* 6. Supply */}
            <TableHead className="h-auto px-table-fluid py-0.5 min-[height:801px]:py-1 border-r border-gray-200 text-[10px] font-bold uppercase tracking-wider text-gray-500 whitespace-nowrap cursor-pointer hover:bg-gray-100 transition-colors group text-center min-w-[100px]">
              <div className="flex items-center justify-center gap-1">
                Supply
                <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-50 transition-opacity" />
              </div>
            </TableHead>
            {/* 7. Rev Action */}
            <TableHead className="h-auto px-table-fluid py-0.5 min-[height:801px]:py-1 border-r border-gray-200 text-[10px] font-bold uppercase tracking-wider text-gray-500 whitespace-nowrap cursor-pointer hover:bg-gray-100 transition-colors group min-w-[100px]">
              <div className="flex items-center gap-1">
                Rev Action
                <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-50 transition-opacity" />
              </div>
            </TableHead>
            {/* 8. Sup Action */}
            <TableHead className="h-auto px-table-fluid py-0.5 min-[height:801px]:py-1 border-r border-gray-200 text-[10px] font-bold uppercase tracking-wider text-gray-500 whitespace-nowrap cursor-pointer hover:bg-gray-100 transition-colors group min-w-[100px]">
              <div className="flex items-center gap-1">
                Sup Action
                <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-50 transition-opacity" />
              </div>
            </TableHead>
            {/* 9. Exp Value */}
            <TableHead className="h-auto px-table-fluid py-0.5 min-[height:801px]:py-1 border-r border-gray-200 text-[10px] font-bold uppercase tracking-wider text-gray-500 whitespace-nowrap cursor-pointer hover:bg-gray-100 transition-colors group text-right min-w-[120px]">
              <div className="flex items-center justify-end gap-1">
                Exp Value
                <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-50 transition-opacity" />
              </div>
            </TableHead>
            {/* 10. Created On */}
            <TableHead className="h-auto px-table-fluid py-0.5 min-[height:801px]:py-1 border-r border-gray-200 text-[10px] font-bold uppercase tracking-wider text-gray-500 whitespace-nowrap cursor-pointer hover:bg-gray-100 transition-colors group min-w-[100px]">
              <div className="flex items-center gap-1">
                Created On
                <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-50 transition-opacity" />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enquiries.map((enquiry) => {
            const isActive = activeEnquiryId === enquiry.id;
            const revInitials = getUserInitials(enquiry.roles?.revenue?.map(r => r.id));
            const supInitials = getUserInitials(enquiry.roles?.supply?.map(r => r.id));
            const revUrgency = getUrgencyInfo(enquiry.tasks?.revenue);
            const supUrgency = getUrgencyInfo(enquiry.tasks?.supply);

            return (
              <TableRow 
                key={enquiry.id}
                onClick={() => selectEnquiry(enquiry.id)}
                className={cn(
                  "cursor-pointer transition-colors group",
                  isActive ? "bg-[#F4F5FB] hover:bg-[#E9ECF7]" : "hover:bg-gray-50"
                )}
              >
                {/* 1. Customer (Sticky) */}
                <TableCell className={cn(
                  "sticky left-0 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] border-r border-gray-100 px-table-fluid py-0.5 min-[height:801px]:py-1.5 text-[11px] font-semibold",
                  isActive ? "bg-[#F4F5FB] group-hover:bg-[#E9ECF7] border-l-[3px] border-primary" : "bg-white group-hover:bg-gray-50 border-l-[3px] border-transparent"
                )}>
                  {enquiry.customer?.name}
                </TableCell>
                {/* 2. Overview */}
                <TableCell className="px-table-fluid py-0.5 min-[height:801px]:py-1.5 border-r border-gray-100 text-[11px] text-gray-600">
                  <div className={cn(
                    isCompact ? "max-w-[200px] line-clamp-2" : "w-[25%] max-w-0 truncate"
                  )}>
                    {enquiry.leadOverview}
                  </div>
                </TableCell>
                {/* 3. Rev Role */}
                <TableCell className="px-table-fluid py-0.5 min-[height:801px]:py-1.5 border-r border-gray-100 text-center">
                  <div className="flex items-center justify-center gap-1">
                    {revInitials ? revInitials.map((initials, idx) => (
                      <span key={idx} className="px-1 py-0 bg-gray-100 text-gray-600 rounded text-[9px] font-bold border border-gray-200">
                        {initials}
                      </span>
                    )) : <span className="text-gray-300">-</span>}
                  </div>
                </TableCell>
                {/* 4. ID */}
                <TableCell className="px-table-fluid py-0.5 min-[height:801px]:py-1.5 border-r border-gray-100 font-mono text-[11px] font-bold whitespace-nowrap">
                  {enquiry.id}
                </TableCell>
                {/* 5. Type */}
                <TableCell className="px-table-fluid py-0.5 min-[height:801px]:py-1.5 border-r border-gray-100 text-center">
                  <span className="text-[11px] font-bold text-[#374151] uppercase whitespace-nowrap">
                    {enquiry.type}
                  </span>
                </TableCell>
                {/* 6. Supply */}
                <TableCell className="px-table-fluid py-0.5 min-[height:801px]:py-1.5 border-r border-gray-100 text-center">
                  <div className="flex items-center justify-center gap-1 flex-nowrap">
                    {supInitials ? supInitials.map((initials, idx) => (
                      <span key={idx} className="px-1 py-0 bg-gray-100 text-gray-600 rounded text-[9px] font-bold border border-gray-200">
                        {initials}
                      </span>
                    )) : <span className="text-gray-300">-</span>}
                  </div>
                </TableCell>
                {/* 7. Rev Action */}
                <TableCell className={cn("px-table-fluid py-0.5 min-[height:801px]:py-1.5 border-r border-gray-100 text-[10px] whitespace-nowrap", revUrgency.color)}>
                  {revUrgency.text}
                </TableCell>
                {/* 8. Sup Action */}
                <TableCell className={cn("px-table-fluid py-0.5 min-[height:801px]:py-1.5 border-r border-gray-100 text-[10px] whitespace-nowrap", supUrgency.color)}>
                  {supUrgency.text}
                </TableCell>
                {/* 9. Exp Value */}
                <TableCell className="px-table-fluid py-0.5 min-[height:801px]:py-1.5 border-r border-gray-100 text-right text-[11px] font-bold text-gray-700">
                  {formatCurrency(enquiry.commercials?.expectedValue)}
                </TableCell>
                {/* 10. Created On */}
                <TableCell className="px-table-fluid py-0.5 min-[height:801px]:py-1.5 border-r border-gray-100 text-[10px] text-gray-400 whitespace-nowrap">
                  {formatDate(enquiry.createdOn)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataGrid;
