import { Suspense } from 'react';

import type { SearchParams } from '../modules/users/types';
import { UserTableSkeleton } from '../modules/users/components/UsersTableSkeleton';
import { UsersPageHeader } from '../modules/users/components/UsersPageHeader';
import { UserTableFilters } from '../modules/users/components/UsersTableFilters';
import UsersTableView from '../modules/users/views/usersTableView';

export default function Page({ searchParams = {} }: { searchParams?: SearchParams }) {
  return (
    <div className="w-full">
      <UsersPageHeader />
      <UserTableFilters />

      <Suspense fallback={<UserTableSkeleton />}>
        <UsersTableView searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
