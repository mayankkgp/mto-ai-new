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

  // Helper: Get Urgency Color based on due date
  const getUrgencyColor = (tasks) => {
    if (!tasks || tasks.length === 0) return 'text-gray-400';
    
    const incompleteTasks = tasks.filter(t => !t.isCompleted);
    if (incompleteTasks.length === 0) return 'text-gray-400';

    // Find earliest due date
    const earliestTask = incompleteTasks.reduce((earliest, current) => {
      return new Date(current.dueDate) < new Date(earliest.dueDate) ? current : earliest;
    });

    const dueDate = new Date(earliestTask.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (dueDate < today) return 'text-red-500 font-bold'; // Overdue
    if (dueDate.getTime() === today.getTime()) return 'text-orange-500 font-bold'; // Today
    if (dueDate.getTime() === tomorrow.getTime()) return 'text-primary font-bold'; // Tomorrow
    return 'text-gray-500'; // Future
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
          <TableRow className="hover:bg-transparent border-b">
            {/* 1. Customer (Sticky) */}
            <TableHead className="sticky left-0 z-40 bg-gray-50 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] border-r px-table-fluid py-th-fluid text-[10px] font-bold uppercase tracking-wider min-w-[180px]">
              Customer
            </TableHead>
            {/* 2. Overview */}
            <TableHead className="px-table-fluid py-th-fluid text-[10px] font-bold uppercase tracking-wider min-w-[250px]">
              Overview
            </TableHead>
            {/* 3. Rev Role */}
            <TableHead className="px-table-fluid py-th-fluid text-[10px] font-bold uppercase tracking-wider text-center min-w-[100px]">
              Rev Role
            </TableHead>
            {/* 4. ID */}
            <TableHead className="px-table-fluid py-th-fluid text-[10px] font-bold uppercase tracking-wider min-w-[120px]">
              ID
            </TableHead>
            {/* 5. Type */}
            <TableHead className="px-table-fluid py-th-fluid text-[10px] font-bold uppercase tracking-wider text-center min-w-[80px]">
              Type
            </TableHead>
            {/* 6. Supply */}
            <TableHead className="px-table-fluid py-th-fluid text-[10px] font-bold uppercase tracking-wider text-center min-w-[100px]">
              Supply
            </TableHead>
            {/* 7. Rev Action */}
            <TableHead className="px-table-fluid py-th-fluid text-[10px] font-bold uppercase tracking-wider min-w-[100px]">
              Rev Action
            </TableHead>
            {/* 8. Sup Action */}
            <TableHead className="px-table-fluid py-th-fluid text-[10px] font-bold uppercase tracking-wider min-w-[100px]">
              Sup Action
            </TableHead>
            {/* 9. Exp Value */}
            <TableHead className="px-table-fluid py-th-fluid text-[10px] font-bold uppercase tracking-wider text-right min-w-[120px]">
              Exp Value
            </TableHead>
            {/* 10. Created On */}
            <TableHead className="px-table-fluid py-th-fluid text-[10px] font-bold uppercase tracking-wider min-w-[100px]">
              Created On
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enquiries.map((enquiry) => {
            const isActive = activeEnquiryId === enquiry.id;
            const revInitials = getUserInitials(enquiry.roles?.revenue?.map(r => r.id));
            const supInitials = getUserInitials(enquiry.roles?.supply?.map(r => r.id));
            const revUrgency = getUrgencyColor(enquiry.tasks?.revenue);
            const supUrgency = getUrgencyColor(enquiry.tasks?.supply);

            return (
              <TableRow 
                key={enquiry.id}
                onClick={() => selectEnquiry(enquiry.id)}
                className={cn(
                  "cursor-pointer transition-colors group",
                  isActive ? "bg-[#F4F5FB]" : "hover:bg-gray-50"
                )}
              >
                {/* 1. Customer (Sticky) */}
                <TableCell className={cn(
                  "sticky left-0 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] border-r border-gray-100 px-table-fluid py-0.5 min-[height:801px]:py-1.5 text-xs font-bold",
                  isActive ? "bg-[#F4F5FB] border-l-[3px] border-primary" : "bg-white group-hover:bg-gray-50 border-l-[3px] border-transparent"
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
                <TableCell className={cn("px-table-fluid py-0.5 min-[height:801px]:py-1.5 border-r border-gray-100 text-[10px] whitespace-nowrap", revUrgency)}>
                  {enquiry.tasks?.revenue?.find(t => !t.isCompleted)?.dueDate ? formatDate(enquiry.tasks.revenue.find(t => !t.isCompleted).dueDate) : '-'}
                </TableCell>
                {/* 8. Sup Action */}
                <TableCell className={cn("px-table-fluid py-0.5 min-[height:801px]:py-1.5 border-r border-gray-100 text-[10px] whitespace-nowrap", supUrgency)}>
                  {enquiry.tasks?.supply?.find(t => !t.isCompleted)?.dueDate ? formatDate(enquiry.tasks.supply.find(t => !t.isCompleted).dueDate) : '-'}
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
