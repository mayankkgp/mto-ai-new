import { 
  Table, 
  TableBody, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table.jsx';
import { useEnquiryContext } from '@/contexts/EnquiryContext.jsx';
import DataGridRow from './DataGridRow.jsx';
import { ArrowUpDown } from 'lucide-react';

/**
 * DataGrid Component
 * Implements the Master Data Grid for enquiries with sticky columns and urgency logic.
 * Refactored for pixel-perfect legacy UI sync.
 */
const DataGrid = ({ isCompact }) => {
  const { enquiries, activeEnquiryId, selectEnquiry, isGlobalLoading } = useEnquiryContext();

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
          {enquiries.map((enquiry) => (
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
