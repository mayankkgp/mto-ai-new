import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils.js";

const tableVariants = cva("w-full border-separate border-spacing-0 min-w-[1000px] table-fixed");
const tableHeaderVariants = cva("sticky top-0 z-30 bg-gray-50 border-b border-gray-200");
const tableRowVariants = cva("", {
  variants: {
    variant: {
      "data-grid-header": "hover:bg-transparent border-b text-gray-500",
      "data-grid-body": "cursor-pointer transition-colors group align-top hover:bg-gray-50 data-[state=selected]:bg-[#F4F5FB] data-[state=selected]:hover:bg-[#E9ECF7]",
    },
  },
});
const tableHeadVariants = cva("h-auto px-table-fluid py-0.5 min-[height:801px]:py-1 text-[10px] font-bold uppercase tracking-wider text-gray-500 whitespace-nowrap cursor-pointer hover:bg-gray-100 transition-colors group", {
  variants: {
    variant: {
      "data-grid": "",
      "data-grid-sticky": "sticky left-0 z-40 bg-white shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] border-r border-gray-200",
    },
  },
});
const tableCellVariants = cva("px-table-fluid py-0.5 min-[height:801px]:py-1 border-r border-gray-100 text-[11px]", {
  variants: {
    variant: {
      "data-grid": "",
      "data-grid-sticky": "sticky left-0 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] text-[11px] font-semibold max-w-0 truncate bg-white group-hover:bg-gray-50 border-l-[3px] border-transparent data-[state=selected]:bg-[#F4F5FB] data-[state=selected]:group-hover:bg-[#E9ECF7] data-[state=selected]:border-primary",
    },
  },
});

function Table({ className, variant = "data-grid", ...props }) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn(tableVariants({ variant }), className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, variant = "data-grid", ...props }) {
  return (
    <thead
      data-slot="table-header"
      className={cn(tableHeaderVariants({ variant }), className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className,
      )}
      {...props}
    />
  );
}
function TableRow({ className, variant = "data-grid-body", ...props }) {
  return (
    <tr
      data-slot="table-row"
      className={cn(tableRowVariants({ variant }), className)}
      {...props}
    />
  );
}

function TableHead({ className, variant = "data-grid", ...props }) {
  return (
    <th
      data-slot="table-head"
      className={cn(tableHeadVariants({ variant }), className)}
      {...props}
    />
  );
}

function TableCell({ className, variant = "data-grid", ...props }) {
  return (
    <td
      data-slot="table-cell"
      className={cn(tableCellVariants({ variant }), className)}
      {...props}
    />
  );
}

function TableCaption({ className, ...props }) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
