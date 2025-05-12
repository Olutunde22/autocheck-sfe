"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export interface PaginationProps {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export default function Pagination({
  currentPage = 1,
  pageSize = 10,
  totalCount = 100,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages || totalPages < currentPage;

  const handlePageSizeChange = (size: number) => {
    onPageSizeChange(size);
    onPageChange(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageButtons = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 3; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("ellipsis");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push("ellipsis");
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push("ellipsis");
        pageNumbers.push(currentPage - 1);
        pageNumbers.push(currentPage);
        pageNumbers.push(currentPage + 1);
        pageNumbers.push("ellipsis");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers.map((page, index) => {
      if (page === "ellipsis") {
        return (
          <span
            key={`ellipsis-${index}`}
            className="-mt-1 hidden px-2 sm:inline"
          >
            ...
          </span>
        );
      }
      return (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "ghost"}
          size="sm"
          className={cn(
            "inline-flex max-h-6 min-h-6 max-w-6 min-w-6 rounded-full text-xs opacity-100",
            currentPage === page &&
              "bg-primary-main text-primary-50 bg-gray-200 dark:bg-gray-800",
          )}
          onClick={() => handlePageChange(page as number)}
        >
          {page}
        </Button>
      );
    });
  };

  return (
    <div className="flex w-full flex-col items-center justify-between space-y-2 sm:flex-row lg:space-y-0">
      <div className="flex items-center gap-3">
        <span className="text-gray-main text-xs font-medium">
          Rows per page{" "}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="min-h-0 max-w-max border border-[#D9D9D9] px-[10px] py-[1px]"
            >
              <span className="font-semibold">{pageSize}</span>
              <ChevronsUpDownIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {[5, 10, 20, 50, 100].map((size) => (
              <DropdownMenuItem
                key={size}
                onClick={() => handlePageSizeChange(size)}
              >
                {size}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="order-1 flex items-center gap-1 sm:order-2">
        <Button
          variant="ghost"
          className={cn(isFirstPage && "pointer-events-none opacity-10")}
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={isFirstPage}
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </Button>
        <div className="flex gap-1">{renderPageButtons()}</div>
        <Button
          variant="ghost"
          className={cn(isLastPage && "pointer-events-none opacity-10")}
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={isLastPage}
        >
          <ChevronRightIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
