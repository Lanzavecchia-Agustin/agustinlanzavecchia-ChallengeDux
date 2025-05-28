'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CreateUserDto, ListUsersParams, UpdateUserDto, User } from '../types';
import { usersService } from '../services/users.service';
import { createUserAction, updateUserAction, deleteUserAction } from '../actions/user.actions';

/**
 * Sistema centralizado de claves de query para usuarios
 */
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (params: ListUsersParams) => [...userKeys.lists(), params] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

/**
 * Hook para obtener lista de usuarios
 * Usa la configuración global del QueryClient (60s staleTime, 5min gcTime)
 */
export function useGetUsers(params: ListUsersParams, ssrData?: User[]) {
  return useQuery<User[]>({
    queryKey: userKeys.list(params),
    queryFn: () => usersService.list(params),
    placeholderData: ssrData,
    // ✅ Sin configuración duplicada - usa la global del provider
  });
}

/**
 * Hook para actualizar usuario
 */
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateUserDto }) =>
      updateUserAction(id, payload),
    onSuccess: (updatedUser, { id }) => {
      // Actualización optimista del caché
      queryClient.setQueryData(userKeys.detail(id), updatedUser);

      // Invalidar listas
      queryClient.invalidateQueries({
        queryKey: userKeys.lists(),
        exact: false,
      });
    },
    onError: (error, { id }) => {
      queryClient.invalidateQueries({
        queryKey: userKeys.detail(id),
      });
    },
  });
}

/**
 * Hook para crear usuario
 */
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateUserDto) => createUserAction(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userKeys.lists(),
        exact: false,
      });
    },
  });
}

/**
 * Hook para eliminar usuario
 */
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteUserAction(id),
    onSuccess: (_, deletedId) => {
      // Remover el usuario específico del caché
      queryClient.removeQueries({
        queryKey: userKeys.detail(deletedId),
      });

      // Invalidar todas las listas para refrescar los datos
      queryClient.invalidateQueries({
        queryKey: userKeys.lists(),
        exact: false,
      });
    },
    onError: (error) => {
      console.error('Error eliminando usuario:', error);
      // Aquí podrías agregar notificación de error
    },
  });
}
