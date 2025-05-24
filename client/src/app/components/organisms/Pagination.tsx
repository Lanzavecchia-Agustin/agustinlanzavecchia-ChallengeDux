'use client';

import React from 'react';
import { Paginator } from 'primereact/paginator';

interface PaginationProps {
  first: number;
  rows: number;
  totalRecords: number;
  onPageChange: (event: { first: number; rows: number; page: number }) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  first,
  rows,
  totalRecords,
  onPageChange,
}) => (
  <div className="flex justify-content-center mt-4">
    <Paginator first={first} rows={rows} totalRecords={totalRecords} onPageChange={onPageChange} />
  </div>
);
