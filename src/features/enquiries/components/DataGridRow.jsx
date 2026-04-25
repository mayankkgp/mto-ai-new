import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table.jsx';
import { cn } from '@/lib/utils.js';

/**
 * DataGridRow Component
 * Renders a single row in a generic DataGrid based on a column configuration.
 */
const DataGridRow = ({ row, columns, isActive, onSelect, isCompact }) => {
  const resolveData = (row, dataKey) => {
    if (!dataKey) return null;
    return dataKey.split('.').reduce((obj, key) => obj?.[key], row);
  };

  return (
    <TableRow 
      onClick={onSelect}
      variant="data-grid-body"
      data-state={isActive ? "selected" : undefined}
    >
      {columns.map((column) => {
        const content = column.render 
          ? column.render(row, isCompact) 
          : resolveData(row, column.dataKey);

        return (
          <TableCell 
            key={column.id}
            variant={column.isSticky ? "data-grid-sticky" : "data-grid"}
            data-state={column.isSticky && isActive ? "selected" : undefined}
            className={cn(
              typeof column.cellClassName === 'function' 
                ? column.cellClassName(isCompact) 
                : column.cellClassName
            )}
          >
            {content}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default DataGridRow;
