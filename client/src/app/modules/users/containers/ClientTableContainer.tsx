'use client';

import { useSearchParams } from 'next/navigation';
import { UsersTable } from '../components/UsersTable';
import type { ListUsersParams, User } from '../types';
import { UserStatus } from '../constants';
import Pagination from '@/app/components/organisms/Pagination';
import { useUserFormContext } from '../context/UserFormContext';
import { useGetUsers } from '../hooks/useUsers';

interface Props {
  ssrUsers: User[]; // datos pre-renderizados desde el servidor
  ssrTotal: number; // total de registros para la paginación
  initialParams: ListUsersParams; // filtros y página iniciales del servidor
}

export default function UsersTableClient({ ssrUsers, ssrTotal, initialParams }: Props) {
  // 1) Tomamos la función openEdit del contexto del layout
  const { openEdit } = useUserFormContext();

  // 2) Leemos la URL actual (query params) en el cliente
  const searchParams = useSearchParams();

  // 3) Reconstruimos los parámetros de consulta a partir de la URL,
  //    cayendo en initialParams si no existen en la queryString.
  const params: ListUsersParams = {
    page: Math.max(1, Number(searchParams.get('page') ?? initialParams.page) || 1),
    limit: initialParams.limit,
    q: searchParams.get('q') ?? initialParams.q,
    estado: (searchParams.get('estado') as UserStatus) ?? initialParams.estado,
    sector: searchParams.get('sector') ? Number(searchParams.get('sector')) : initialParams.sector,
  };

  // 4) React-Query hook:
  //    - placeholderData = ssrUsers: usamos los datos de SSR como punto de partida
  //    - dispara un refetch al montarse/re-montarse con los nuevos params
  //    - nos devuelve `data` y `isLoading` para manejar estado de carga
  const { data: users = [], isLoading } = useGetUsers(params, ssrUsers);

  return (
    <>
      {/* 5) Tabla interactiva */}
      <UsersTable
        users={users}
        loading={isLoading}
        onRowSelect={(selectedUser) => {
          openEdit(selectedUser);
        }}
      />

      {/* 6) Paginador */}
      <Pagination totalRecords={ssrTotal} />
    </>
  );
}
