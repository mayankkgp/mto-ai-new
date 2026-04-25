import React from 'react';
import { Badge } from '@/components/ui/badge.jsx';
import { cn } from '@/lib/utils.js';
import { 
  formatCurrency, 
  getUserInitials, 
  getUrgencyInfo, 
  formatDate 
} from '@/utils/formatters.js';

/**
 * Enquiry Grid Columns Configuration
 * Defines how each column is rendered and styled in the master grid.
 */
export const getEnquiryGridColumns = (context) => {
  const { users } = context || {};

  return [
    {
      id: 'customer',
      label: 'Customer',
      isSticky: true,
      headerClassName: 'min-w-[180px] group',
      render: (row) => row.customer?.name
    },
    {
      id: 'overview',
      label: 'Overview',
      headerClassName: (isCompact) => cn(isCompact ? "w-[200px]" : "w-[25%]"),
      cellClassName: 'text-[11px] text-gray-600',
      render: (row, isCompact) => (
        <div className={cn(
          isCompact ? "max-w-[200px] whitespace-normal line-clamp-2" : "w-full truncate"
        )}>
          {row.leadOverview}
        </div>
      )
    },
    {
      id: 'revRole',
      label: 'Rev Role',
      headerClassName: 'text-center min-w-[100px]',
      cellClassName: 'text-center',
      render: (row) => {
        const initials = getUserInitials(row.roles?.revenue?.map(r => r.id), users);
        return (
          <div className="flex items-center justify-center gap-1">
            {initials ? initials.map((init, idx) => (
              <Badge key={idx} variant="initials-grid">{init}</Badge>
            )) : <span className="text-gray-300">-</span>}
          </div>
        );
      }
    },
    {
      id: 'id',
      label: 'ID',
      headerClassName: 'min-w-[120px]',
      cellClassName: 'font-mono text-[11px] font-bold max-w-0 truncate',
      dataKey: 'id'
    },
    {
      id: 'type',
      label: 'Type',
      headerClassName: 'text-center min-w-[80px]',
      cellClassName: 'text-center max-w-0 truncate',
      render: (row) => (
        <span className="text-[11px] font-bold text-[#374151] uppercase">
          {row.type}
        </span>
      )
    },
    {
      id: 'supply',
      label: 'Supply',
      headerClassName: 'text-center min-w-[100px]',
      cellClassName: 'text-center',
      render: (row) => {
        const initials = getUserInitials(row.roles?.supply?.map(r => r.id), users);
        return (
          <div className="flex items-center justify-center gap-1 flex-nowrap">
            {initials ? initials.map((init, idx) => (
              <Badge key={idx} variant="initials-grid">{init}</Badge>
            )) : <span className="text-gray-300">-</span>}
          </div>
        );
      }
    },
    {
      id: 'revAction',
      label: 'Rev Action',
      headerClassName: 'min-w-[100px]',
      render: (row) => {
        const urgency = getUrgencyInfo(row.tasks?.revenue);
        return (
          <div className={cn("text-[10px] max-w-0 truncate", urgency.color)}>
            {urgency.text}
          </div>
        );
      }
    },
    {
      id: 'supAction',
      label: 'Sup Action',
      headerClassName: 'min-w-[100px]',
      render: (row) => {
        const urgency = getUrgencyInfo(row.tasks?.supply);
        return (
          <div className={cn("text-[10px] max-w-0 truncate", urgency.color)}>
            {urgency.text}
          </div>
        );
      }
    },
    {
      id: 'expectedValue',
      label: 'Exp Value',
      headerClassName: 'text-right min-w-[120px]',
      cellClassName: 'text-right text-[11px] font-bold text-gray-700',
      render: (row) => formatCurrency(row.commercials?.expectedValue)
    },
    {
      id: 'createdOn',
      label: 'Created On',
      headerClassName: 'min-w-[100px]',
      cellClassName: 'text-[10px] text-gray-400 max-w-0 truncate',
      render: (row) => formatDate(row.createdOn)
    }
  ];
};
