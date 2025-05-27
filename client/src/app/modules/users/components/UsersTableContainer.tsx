'use client';

import { useGetUsers } from '../hooks/querys/useGetUsers';
import { UsersTable } from './UsersTable';
import { useUserFormContext } from '../context/UserFormContext';
import type { User } from '../types';

interface Props {
  users: User[];
  page: number;
}

export const UsersTableContainer = ({ users, page }: Props) => {
  const { data = [], isLoading } = useGetUsers({ page }, users);
  const { openEdit } = useUserFormContext();

  return <UsersTable users={data} loading={isLoading} onRowSelect={openEdit} />;
};
