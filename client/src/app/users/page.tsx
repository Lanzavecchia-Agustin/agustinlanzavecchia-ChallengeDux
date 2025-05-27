import { Suspense } from 'react';
import { UserTableSkeleton } from '../modules/users/components/UsersTableSkeleton';
import { UsersViewLayout } from '../modules/users/views/UsersViewLayout';
import { UsersTableServer } from '../modules/users/views/UsersTableServer';

export default function UsersPage({ searchParams }: { searchParams?: { page?: string } }) {
  const page = Number(searchParams?.page ?? 1);

  return (
    <UsersViewLayout page={page}>
      <Suspense fallback={<UserTableSkeleton />}>
        <UsersTableServer page={page} />
      </Suspense>
    </UsersViewLayout>
  );
}
