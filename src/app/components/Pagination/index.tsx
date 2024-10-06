'use client';

import React, {ReactNode} from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { PageControllerButton } from './SubComponents';
import { pageSize } from '@/app/constant/pagination';

interface PaginationProps {
  currentPage: number;         // Current page number
  total: number;               // Total number of items - companies
  pageSize: number;          // Number of items on a single page
  onPageChange: (page: number) => void; // Callback to handle page changes
}


const Pagination: React.FC<PaginationProps> = ({ currentPage, total, pageSize, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PageControllerButton key={i} onClick={() => handlePageClick(i)} isCurrent={i === currentPage}>
          {i}
        </PageControllerButton>
      );
    }
    return pages;
  };

  const totalPages = Math.ceil(total / pageSize);
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white py-3">
      {/* Mobile pagination buttons */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        {/* Info text about from which index is showing currently */}
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> to <span className="font-medium">{(currentPage - 1) * pageSize + 10}</span> of{' '}
            <span className="font-medium">{total}</span> results
          </p>
        </div>
        {/* Pagination controls on desktop */}
        <div className="ml-8">
          <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
            <PageControllerButton
              onClick={handlePrevious}
              isDisabled={currentPage === 1}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
            </PageControllerButton>
            {renderPageNumbers()}
            <PageControllerButton
              onClick={handleNext}
              isDisabled={currentPage === totalPages}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
            </PageControllerButton>
          </nav>
        </div>
      </div>
    </div>
  )
};

export default Pagination;
