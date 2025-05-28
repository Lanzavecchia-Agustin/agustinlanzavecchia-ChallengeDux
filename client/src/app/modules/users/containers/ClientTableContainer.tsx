'use client';

import { useSearchParams } from 'next/navigation';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { UsersTable } from '../components/UsersTable';
import type { ListUsersParams, User } from '../types';
import { UserStatus } from '../constants';
import Pagination from '@/app/components/organisms/Pagination';
import { useUserFormContext } from '../context/UserFormContext';
import { useGetUsers, useDeleteUser } from '../hooks/useUsers';

interface Props {
  ssrUsers: User[]; // datos pre-renderizados desde el servidor
  ssrTotal: number; // total de registros para la paginación
  initialParams: ListUsersParams; // filtros y página iniciales del servidor
}

export default function UsersTableClient({ ssrUsers, ssrTotal, initialParams }: Props) {
  // Ref para las notificaciones toast
  const toast = useRef<Toast>(null);

  // 1) Tomamos la función openEdit del contexto del layout
  const { openEdit } = useUserFormContext();

  // 2) Hook para eliminar usuarios
  const deleteUser = useDeleteUser();

  // 3) Leemos la URL actual (query params) en el cliente
  const searchParams = useSearchParams();

  // 4) Reconstruimos los parámetros de consulta a partir de la URL,
  //    cayendo en initialParams si no existen en la queryString.
  const params: ListUsersParams = {
    page: Math.max(1, Number(searchParams.get('page') ?? initialParams.page) || 1),
    limit: initialParams.limit,
    q: searchParams.get('q') ?? initialParams.q,
    estado: (searchParams.get('estado') as UserStatus) ?? initialParams.estado,
    sector: searchParams.get('sector') ? Number(searchParams.get('sector')) : initialParams.sector,
  };

  // 5) React-Query hook:
  //    - placeholderData = ssrUsers: usamos los datos de SSR como punto de partida
  //    - dispara un refetch al montarse/re-montarse con los nuevos params
  //    - nos devuelve `data` y `isLoading` para manejar estado de carga
  const { data: users = [], isLoading } = useGetUsers(params, ssrUsers);

  // 6) Función para manejar la eliminación de usuarios
  const handleDeleteUser = async (user: User) => {
    try {
      await deleteUser.mutateAsync(user.id);
      toast.current?.show({
        severity: 'success',
        summary: 'Usuario eliminado',
        detail: `El usuario "${user.usuario}" ha sido eliminado exitosamente`,
        life: 3000,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo eliminar el usuario. Inténtalo de nuevo.',
        life: 3000,
      });
    }
  };

  return (
    <>
      {/* Toast para notificaciones */}
      <Toast ref={toast} />

      {/* Modal de confirmación para eliminación */}
      <ConfirmDialog />

      {/* 7) Tabla interactiva */}
      <UsersTable
        users={users}
        loading={isLoading}
        onRowSelect={(selectedUser) => {
          openEdit(selectedUser);
        }}
        onDelete={handleDeleteUser}
        deletingUserId={deleteUser.isPending ? deleteUser.variables : undefined}
      />

      {/* 8) Paginador */}
      <Pagination totalRecords={ssrTotal} />
    </>
  );
}
