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
        <TableHeader className="sticky top-0 z-30 bg-white">
          <TableRow className="hover:bg-transparent border-b">
            {/* 1. Customer (Sticky) */}
            <TableHead className="sticky left-0 z-40 bg-white shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] border-r px-table-fluid py-th-fluid text-[11px] font-bold uppercase tracking-wider min-w-[180px]">
              Customer
            </TableHead>
            {/* 2. Overview */}
            <TableHead className="px-table-fluid py-th-fluid text-[11px] font-bold uppercase tracking-wider min-w-[250px]">
              Overview
            </TableHead>
            {/* 3. Rev Role */}
            <TableHead className="px-table-fluid py-th-fluid text-[11px] font-bold uppercase tracking-wider text-center min-w-[100px]">
              Rev Role
            </TableHead>
            {/* 4. ID */}
            <TableHead className="px-table-fluid py-th-fluid text-[11px] font-bold uppercase tracking-wider min-w-[120px]">
              ID
            </TableHead>
            {/* 5. Type */}
            <TableHead className="px-table-fluid py-th-fluid text-[11px] font-bold uppercase tracking-wider text-center min-w-[80px]">
              Type
            </TableHead>
            {/* 6. Supply */}
            <TableHead className="px-table-fluid py-th-fluid text-[11px] font-bold uppercase tracking-wider text-center min-w-[100px]">
              Supply
            </TableHead>
            {/* 7. Rev Action */}
            <TableHead className="px-table-fluid py-th-fluid text-[11px] font-bold uppercase tracking-wider min-w-[100px]">
              Rev Action
            </TableHead>
            {/* 8. Sup Action */}
            <TableHead className="px-table-fluid py-th-fluid text-[11px] font-bold uppercase tracking-wider min-w-[100px]">
              Sup Action
            </TableHead>
            {/* 9. Exp Value */}
            <TableHead className="px-table-fluid py-th-fluid text-[11px] font-bold uppercase tracking-wider text-right min-w-[120px]">
              Exp Value
            </TableHead>
            {/* 10. Created On */}
            <TableHead className="px-table-fluid py-th-fluid text-[11px] font-bold uppercase tracking-wider min-w-[100px]">
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
                  isActive ? "bg-[#F4F5FB] border-l-4 border-l-primary" : "hover:bg-gray-50 border-l-4 border-l-transparent"
                )}
              >
                {/* 1. Customer (Sticky) */}
                <TableCell className={cn(
                  "sticky left-0 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] border-r px-table-fluid py-2 text-xs font-bold",
                  isActive ? "bg-[#F4F5FB]" : "bg-white group-hover:bg-gray-50"
                )}>
                  {enquiry.customer?.name}
                </TableCell>
                {/* 2. Overview */}
                <TableCell className="px-table-fluid py-2 text-[11px] text-gray-600">
                  <div className={cn(
                    "truncate",
                    isCompact ? "max-w-[180px]" : "max-w-[300px]"
                  )}>
                    {enquiry.leadOverview}
                  </div>
                </TableCell>
                {/* 3. Rev Role */}
                <TableCell className="px-table-fluid py-2 text-center">
                  <div className="flex items-center justify-center gap-1">
                    {revInitials ? revInitials.map((initials, idx) => (
                      <span key={idx} className="inline-flex items-center justify-center size-5 rounded-full bg-gray-100 text-[9px] font-bold text-gray-600 border border-gray-200">
                        {initials}
                      </span>
                    )) : <span className="text-gray-300">-</span>}
                  </div>
                </TableCell>
                {/* 4. ID */}
                <TableCell className="px-table-fluid py-2 text-[11px] font-mono text-gray-500">
                  {enquiry.id}
                </TableCell>
                {/* 5. Type */}
                <TableCell className="px-table-fluid py-2 text-center">
                  <span className="text-[10px] font-black uppercase tracking-tighter text-gray-700">
                    {enquiry.type}
                  </span>
                </TableCell>
                {/* 6. Supply */}
                <TableCell className="px-table-fluid py-2 text-center">
                  <div className="flex items-center justify-center gap-1">
                    {supInitials ? supInitials.map((initials, idx) => (
                      <span key={idx} className="inline-flex items-center justify-center size-5 rounded-full bg-gray-100 text-[9px] font-bold text-gray-600 border border-gray-200">
                        {initials}
                      </span>
                    )) : <span className="text-gray-300">-</span>}
                  </div>
                </TableCell>
                {/* 7. Rev Action */}
                <TableCell className={cn("px-table-fluid py-2 text-[11px]", revUrgency)}>
                  {enquiry.tasks?.revenue?.find(t => !t.isCompleted)?.dueDate ? formatDate(enquiry.tasks.revenue.find(t => !t.isCompleted).dueDate) : '-'}
                </TableCell>
                {/* 8. Sup Action */}
                <TableCell className={cn("px-table-fluid py-2 text-[11px]", supUrgency)}>
                  {enquiry.tasks?.supply?.find(t => !t.isCompleted)?.dueDate ? formatDate(enquiry.tasks.supply.find(t => !t.isCompleted).dueDate) : '-'}
                </TableCell>
                {/* 9. Exp Value */}
                <TableCell className="px-table-fluid py-2 text-right text-[11px] font-bold text-gray-700">
                  {formatCurrency(enquiry.commercials?.expectedValue)}
                </TableCell>
                {/* 10. Created On */}
                <TableCell className="px-table-fluid py-2 text-[11px] text-gray-400">
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
