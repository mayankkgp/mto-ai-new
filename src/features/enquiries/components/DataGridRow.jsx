import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table.jsx';
import { cn } from '@/lib/utils.js';
import { 
  formatCurrency, 
  getUserInitials, 
  getUrgencyInfo, 
  formatDate 
} from '@/utils/formatters.js';

/**
 * DataGridRow Component
 * Renders a single row in the DataGrid with all its cells and formatting logic.
 */
const DataGridRow = ({ enquiry, isActive, onSelect, isCompact }) => {
  const revInitials = getUserInitials(enquiry.roles?.revenue?.map(r => r.id));
  const supInitials = getUserInitials(enquiry.roles?.supply?.map(r => r.id));
  const revUrgency = getUrgencyInfo(enquiry.tasks?.revenue);
  const supUrgency = getUrgencyInfo(enquiry.tasks?.supply);

  return (
    <TableRow 
      onClick={onSelect}
      className={cn(
        "cursor-pointer transition-colors group align-top",
        isActive ? "bg-[#F4F5FB] hover:bg-[#E9ECF7]" : "hover:bg-gray-50"
      )}
    >
      {/* 1. Customer (Sticky) */}
      <TableCell className={cn(
        "sticky left-0 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] border-r border-gray-100 px-table-fluid py-0.5 min-[height:801px]:py-1.5 text-[11px] font-semibold max-w-0 truncate",
        isActive ? "bg-[#F4F5FB] group-hover:bg-[#E9ECF7] border-l-[3px] border-primary" : "bg-white group-hover:bg-gray-50 border-l-[3px] border-transparent"
      )}>
        {enquiry.customer?.name}
      </TableCell>
      {/* 2. Overview */}
      <TableCell className="px-table-fluid py-0.5 min-[height:801px]:py-1.5 border-r border-gray-100 text-[11px] text-gray-600">
        <div className={cn(
          isCompact ? "max-w-[200px] whitespace-normal line-clamp-2" : "w-[25%] max-w-0 truncate"
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
      <TableCell className="px-table-fluid py-0.5 min-[height:801px]:py-1.5 border-r border-gray-100 font-mono text-[11px] font-bold max-w-0 truncate">
        {enquiry.id}
      </TableCell>
      {/* 5. Type */}
      <TableCell className="px-table-fluid py-0.5 min-[height:801px]:py-1.5 border-r border-gray-100 text-center max-w-0 truncate">
        <span className="text-[11px] font-bold text-[#374151] uppercase">
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
      <TableCell className={cn("px-table-fluid py-0.5 min-[height:801px]:py-1.5 border-r border-gray-100 text-[10px] max-w-0 truncate", revUrgency.color)}>
        {revUrgency.text}
      </TableCell>
      {/* 8. Sup Action */}
      <TableCell className={cn("px-table-fluid py-0.5 min-[height:801px]:py-1.5 border-r border-gray-100 text-[10px] max-w-0 truncate", supUrgency.color)}>
        {supUrgency.text}
      </TableCell>
      {/* 9. Exp Value */}
      <TableCell className="px-table-fluid py-0.5 min-[height:801px]:py-1.5 border-r border-gray-100 text-right text-[11px] font-bold text-gray-700">
        {formatCurrency(enquiry.commercials?.expectedValue)}
      </TableCell>
      {/* 10. Created On */}
      <TableCell className="px-table-fluid py-0.5 min-[height:801px]:py-1.5 border-r border-gray-100 text-[10px] text-gray-400 max-w-0 truncate">
        {formatDate(enquiry.createdOn)}
      </TableCell>
    </TableRow>
  );
};

export default DataGridRow;
