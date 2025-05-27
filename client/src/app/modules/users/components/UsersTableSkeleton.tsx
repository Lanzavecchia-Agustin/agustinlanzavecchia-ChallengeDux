'use client';

import { Skeleton } from 'primereact/skeleton';

export const UserTableSkeleton = () => {
  return (
    <div className="surface-card border-round shadow p-4">
      <div className="mb-5">
        <Skeleton width="40%" height="2rem" className="mb-2" />
        <Skeleton width="60%" height="2rem" />
      </div>

      <div className="table w-full">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex surface-border py-2 align-items-center">
            <Skeleton width="20%" height="1.5rem" className="mr-4" />
            <Skeleton width="30%" height="1.5rem" className="mr-4" />
            <Skeleton width="25%" height="1.5rem" className="mr-4" />
            <Skeleton width="15%" height="1.5rem" />
          </div>
        ))}
      </div>
    </div>
  );
};
