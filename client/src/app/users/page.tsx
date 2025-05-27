import { Suspense } from 'react';
import { UserTableSkeleton } from '../modules/users/components/UsersTableSkeleton';
import { UsersViewLayout } from '../modules/users/views/UsersViewLayout';
import { UsersTableServer } from '../modules/users/views/UsersTableServer';
import { SearchParams } from '../modules/users/types';

export default function UsersPage({ searchParams = {} }: { searchParams?: SearchParams }) {
  return (
    <UsersViewLayout>
      <Suspense fallback={<UserTableSkeleton />}>
        <UsersTableServer searchParams={searchParams} />
      </Suspense>
    </UsersViewLayout>
  );
}
