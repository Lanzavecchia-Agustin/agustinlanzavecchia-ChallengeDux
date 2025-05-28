// app/users/components/Pagination.tsx
'use client';

import { Paginator } from 'primereact/paginator';
import { useSearchParams, useRouter } from 'next/navigation';

interface PaginationProps {
  totalRecords: number;
}

export default function Pagination({ totalRecords }: PaginationProps) {
  const sp = useSearchParams();
  const router = useRouter();
  const page = Number(sp.get('page') ?? '1');
  const rows = 10;

  return (
    <div className="flex align-items-center justify-content-center mt-4">
      <Paginator
        first={(page - 1) * rows}
        rows={rows}
        totalRecords={totalRecords}
        onPageChange={(e) => {
          const newPage = e.page + 1;
          const qp = new URLSearchParams(sp);
          qp.set('page', String(newPage));
          router.push(`?${qp.toString()}`);
        }}
      />
    </div>
  );
}
