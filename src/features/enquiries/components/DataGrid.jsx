import { 
  Table, 
  TableBody, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table.jsx';
import { useUIState } from '@/contexts/UIStateContext.jsx';
import { useEnquiryDetail } from '@/contexts/EnquiryDetailContext.jsx';
import DataGridRow from './DataGridRow.jsx';
import { ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils.js';

/**
 * DataGrid Component
 * Implements the Master Data Grid for enquiries with sticky columns and urgency logic.
 * Refactored for pixel-perfect legacy UI sync.
 */
const DataGrid = ({ isCompact, filteredEnquiries }) => {
  const { isGlobalLoading } = useUIState();
  const { activeEnquiryId, selectEnquiry } = useEnquiryDetail();

  if (isGlobalLoading) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground animate-pulse">
        Loading enquiries...
      </div>
    );
  }

  if (filteredEnquiries.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground italic">
        No enquiries found.
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto no-scrollbar relative">
      <Table variant="data-grid">
        <TableHeader variant="data-grid">
          <TableRow variant="data-grid-header">
            {/* 1. Customer (Sticky) */}
            <TableHead variant="data-grid-sticky" className="min-w-[180px] group">
              <div className="flex items-center gap-1">
                Customer
                <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-50 transition-opacity" />
              </div>
            </TableHead>
            {/* 2. Overview */}
            <TableHead 
              variant="data-grid"
              className={cn(isCompact ? "w-[200px]" : "w-[25%]")}
            >
              <div className="flex items-center gap-1">
                Overview
                <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-50 transition-opacity" />
              </div>
            </TableHead>
            {/* 3. Rev Role */}
            <TableHead variant="data-grid" className={cn("text-center min-w-[100px]")}>
              <div className="flex items-center justify-center gap-1">
                Rev Role
                <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-50 transition-opacity" />
              </div>
            </TableHead>
            {/* 4. ID */}
            <TableHead variant="data-grid" className={cn("min-w-[120px]")}>
              <div className="flex items-center gap-1">
                ID
                <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-50 transition-opacity" />
              </div>
            </TableHead>
            {/* 5. Type */}
            <TableHead variant="data-grid" className={cn("text-center min-w-[80px]")}>
              <div className="flex items-center justify-center gap-1">
                Type
                <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-50 transition-opacity" />
              </div>
            </TableHead>
            {/* 6. Supply */}
            <TableHead variant="data-grid" className={cn("text-center min-w-[100px]")}>
              <div className="flex items-center justify-center gap-1">
                Supply
                <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-50 transition-opacity" />
              </div>
            </TableHead>
            {/* 7. Rev Action */}
            <TableHead variant="data-grid" className={cn("min-w-[100px]")}>
              <div className="flex items-center gap-1">
                Rev Action
                <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-50 transition-opacity" />
              </div>
            </TableHead>
            {/* 8. Sup Action */}
            <TableHead variant="data-grid" className={cn("min-w-[100px]")}>
              <div className="flex items-center gap-1">
                Sup Action
                <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-50 transition-opacity" />
              </div>
            </TableHead>
            {/* 9. Exp Value */}
            <TableHead variant="data-grid" className={cn("text-right min-w-[120px]")}>
              <div className="flex items-center justify-end gap-1">
                Exp Value
                <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-50 transition-opacity" />
              </div>
            </TableHead>
            {/* 10. Created On */}
            <TableHead variant="data-grid" className={cn("min-w-[100px]")}>
              <div className="flex items-center gap-1">
                Created On
                <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-50 transition-opacity" />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredEnquiries.map((enquiry) => (
            <DataGridRow 
              key={enquiry.id} 
              enquiry={enquiry} 
              isActive={activeEnquiryId === enquiry.id} 
              onSelect={() => selectEnquiry(enquiry.id)} 
              isCompact={isCompact}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataGrid;
