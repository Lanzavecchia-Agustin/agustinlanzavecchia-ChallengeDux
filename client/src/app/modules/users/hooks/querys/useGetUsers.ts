'use client';
import { useQuery } from '@tanstack/react-query';
import { usersService } from '../../services/users.service';
import type { ListUsersParams, User } from '../../types';

/**
 * Hook reactivo a filtros y paginación.
 */
export function useGetUsers(params: ListUsersParams, ssrData?: User[]) {
  return useQuery<User[]>({
    queryKey: ['users', params],
    queryFn: () => usersService.list(params),

    /* UX */
    placeholderData: ssrData, // muestra el SSR mientras llega la nueva petición
    staleTime: 0, // siempre stale ⇒ refetch inmediato
    refetchOnMount: true, // revalida si el comp. se desmonta/remonta

    /* Cache */
    gcTime: 5 * 60 * 1000, // 5 min antes de ser liberada de la caché
  });
}
