import { 
  Table, 
  TableBody, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table.jsx';
import DataGridRow from './data-grid-row.jsx';
import { ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils.js';

/**
 * DataGrid Component
 * Generic Master Data Grid that renders based on columns configuration.
 */
const DataGrid = ({ 
  data, 
  columns, 
  activeRowId, 
  onRowSelect, 
  isLoading, 
  isCompact 
}) => {
  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground animate-pulse">
        Loading data...
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground italic">
        No data found.
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto no-scrollbar relative">
      <Table variant="data-grid">
        <TableHeader variant="data-grid">
          <TableRow variant="data-grid-header">
            {columns.map((column) => {
              const resolvedHeaderClass = typeof column.headerClassName === 'function' 
                ? column.headerClassName(isCompact) 
                : column.headerClassName;

              return (
                <TableHead 
                  key={column.id}
                  variant={column.isSticky ? "data-grid-sticky" : "data-grid"}
                  className={cn(resolvedHeaderClass, "group")}
                >
                  <div className={cn(
                    "flex items-center gap-1",
                    resolvedHeaderClass?.includes('text-center') && "justify-center",
                    resolvedHeaderClass?.includes('text-right') && "justify-end"
                  )}>
                    {column.label}
                    <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-50 transition-opacity" />
                  </div>
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <DataGridRow 
              key={item.id} 
              row={item} 
              columns={columns}
              isActive={activeRowId === item.id} 
              onSelect={() => onRowSelect(item.id)} 
              isCompact={isCompact}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataGrid;
