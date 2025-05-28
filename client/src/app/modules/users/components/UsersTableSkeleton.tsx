'use client';

import { Skeleton } from 'primereact/skeleton';

export const UserTableSkeleton = () => {
  return (
    <div className="surface-card border-round shadow">
      <Skeleton width="100%" height="3rem" />

      <div className="table w-full">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex surface-border py-1 align-items-center">
            <Skeleton width="100%" height="5rem" />
          </div>
        ))}
      </div>
    </div>
  );
};
