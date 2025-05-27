'use client';
import { useQuery } from '@tanstack/react-query';
import { usersService } from '../../services/users.service';
import type { ListUsersParams, User } from '../../types';

export function useGetUsers(params: ListUsersParams, initialData?: User[]) {
  return useQuery<User[]>({
    queryKey: ['users', params],
    queryFn: () => usersService.list(params),
    initialData,
    staleTime: 30_000,
    gcTime: 5 * 60 * 1000, // 5 minutos
  });
}
