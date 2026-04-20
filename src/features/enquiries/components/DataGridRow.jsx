import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { useReferenceData } from '@/contexts/ReferenceDataContext.jsx';
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
  const { users } = useReferenceData();
  const revInitials = getUserInitials(enquiry.roles?.revenue?.map(r => r.id), users);
  const supInitials = getUserInitials(enquiry.roles?.supply?.map(r => r.id), users);
  const revUrgency = getUrgencyInfo(enquiry.tasks?.revenue);
  const supUrgency = getUrgencyInfo(enquiry.tasks?.supply);

  return (
    <TableRow 
      onClick={onSelect}
      variant="data-grid-body"
      data-state={isActive ? "selected" : undefined}
    >
      {/* 1. Customer (Sticky) */}
      <TableCell variant="data-grid-sticky" data-state={isActive ? "selected" : undefined}>
        {enquiry.customer?.name}
      </TableCell>
      {/* 2. Overview */}
      <TableCell variant="data-grid" className="text-[11px] text-gray-600">
        <div className={cn(
          isCompact ? "max-w-[200px] whitespace-normal line-clamp-2" : "w-full truncate"
        )}>
          {enquiry.leadOverview}
        </div>
      </TableCell>
      {/* 3. Rev Role */}
      <TableCell variant="data-grid" className="text-center">
        <div className="flex items-center justify-center gap-1">
          {revInitials ? revInitials.map((initials, idx) => (
            <Badge key={idx} variant="initials-grid">{initials}</Badge>
          )) : <span className="text-gray-300">-</span>}
        </div>
      </TableCell>
      {/* 4. ID */}
      <TableCell variant="data-grid" className="font-mono text-[11px] font-bold max-w-0 truncate">
        {enquiry.id}
      </TableCell>
      {/* 5. Type */}
      <TableCell variant="data-grid" className="text-center max-w-0 truncate">
        <span className="text-[11px] font-bold text-[#374151] uppercase">
          {enquiry.type}
        </span>
      </TableCell>
      {/* 6. Supply */}
      <TableCell variant="data-grid" className="text-center">
        <div className="flex items-center justify-center gap-1 flex-nowrap">
          {supInitials ? supInitials.map((initials, idx) => (
            <Badge key={idx} variant="initials-grid">{initials}</Badge>
          )) : <span className="text-gray-300">-</span>}
        </div>
      </TableCell>
      {/* 7. Rev Action */}
      <TableCell variant="data-grid" className={cn("text-[10px] max-w-0 truncate", revUrgency.color)}>
        {revUrgency.text}
      </TableCell>
      {/* 8. Sup Action */}
      <TableCell variant="data-grid" className={cn("text-[10px] max-w-0 truncate", supUrgency.color)}>
        {supUrgency.text}
      </TableCell>
      {/* 9. Exp Value */}
      <TableCell variant="data-grid" className="text-right text-[11px] font-bold text-gray-700">
        {formatCurrency(enquiry.commercials?.expectedValue)}
      </TableCell>
      {/* 10. Created On */}
      <TableCell variant="data-grid" className="text-[10px] text-gray-400 max-w-0 truncate">
        {formatDate(enquiry.createdOn)}
      </TableCell>
    </TableRow>
  );
};

export default DataGridRow;
