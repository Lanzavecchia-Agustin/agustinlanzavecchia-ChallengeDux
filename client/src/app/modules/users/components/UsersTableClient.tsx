'use client';

import Pagination from '@/app/components/organisms/Pagination';
import { useUsersContext } from '../context/UsersContext';
import { UsersTable } from './UsersTable';
import type { User } from '../types';

interface Props {
  ssrUsers: User[];
  ssrTotal: number;
}

export default function UsersTableClient({ ssrUsers, ssrTotal }: Props) {
  const { openEditModal } = useUsersContext();

  return (
    <>
      <UsersTable users={ssrUsers} loading={false} onRowSelect={openEditModal} />
      <Pagination totalRecords={ssrTotal} />
    </>
  );
}
