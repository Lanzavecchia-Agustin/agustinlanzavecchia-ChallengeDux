'use client';

import { useSearchParams } from 'next/navigation';
import { useGetUsers } from '../hooks/querys/useGetUsers';
import { UsersTable } from './UsersTable';
import { useUserFormContext } from '../context/UserFormContext';
import { UserStatus } from '../constants';
import type { User } from '../types';

interface Props {
  /** Datos pre-renderizados en el server component */
  users: User[];
}

export const UsersTableContainer = ({ users }: Props) => {
  const sp = useSearchParams();
  const { openEdit } = useUserFormContext();

  /* Filtros y paginación leídos de la URL ----------------------- */
  const page = Number(sp.get('page') ?? 1);
  const q = sp.get('q') ?? undefined;
  const estado = sp.get('estado') as UserStatus | undefined;
  const sector = sp.get('sector') ? Number(sp.get('sector')) : undefined;

  /* React Query con placeholderData ----------------------------- */
  const { data = [], isLoading } = useGetUsers(
    { page, limit: 10, q, estado, sector },
    users, // placeholderData (SSR)
  );

  return <UsersTable users={data} loading={isLoading} onRowSelect={openEdit} />;
};
