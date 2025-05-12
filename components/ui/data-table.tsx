"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Pagination, { PaginationProps } from "@/components/shared/pagination";
import { Skeleton } from "@/components/ui/skeleton";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data?: TData[] | null;
  className?: string;
  rootClassName?: string;
  emptyState?: React.ReactNode;
  isLoading?: boolean;
  pagination?: PaginationProps;
}

export function DataTable<TData, TValue>({
  columns,
  className,
  rootClassName,
  data,
  emptyState,
  isLoading,
  pagination,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (!isLoading && data?.length === 0 && emptyState) {
    return emptyState;
  }

  return (
    <div
      className={cn(
        "flex h-[calc(100vh-180px)] flex-col justify-between space-y-6 lg:h-[calc(100vh-230px)]",
        rootClassName,
      )}
    >
      <ScrollArea className={cn("w-full border", className)}>
        <Table>
          <TableHeader className="sticky top-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="text-xs font-medium" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="whitespace-nowrap" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 15 }).map((_, index) => (
                <TableRow key={index}>
                  {columns.map((_, colIndex) => (
                    <TableCell key={colIndex}>
                      <Skeleton className="h-5 animate-pulse rounded" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="text"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="text-sm font-medium" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {emptyState || "No results."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
        <ScrollBar orientation="vertical" />
      </ScrollArea>

      {pagination && (
        <Pagination
          currentPage={table.getState().pagination.pageIndex + 1}
          pageSize={pagination.pageSize}
          totalCount={table.getRowCount()}
          onPageChange={(page) => {
            table.setPageIndex(page - 1);
          }}
          onPageSizeChange={(size) => {
            table.setPageSize(size);
            pagination.onPageSizeChange(size);
          }}
        />
      )}
    </div>
  );
}
