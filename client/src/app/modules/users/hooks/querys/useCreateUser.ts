'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUserAction } from '../../actions/user.actions';
import type { CreateUserDto } from '../../types';

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateUserDto) => createUserAction(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });
}
