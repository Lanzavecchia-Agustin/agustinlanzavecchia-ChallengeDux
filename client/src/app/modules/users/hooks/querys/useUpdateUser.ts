'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserAction } from '../../actions/user.actions';
import type { UpdateUserDto } from '../../types';

export function useUpdateUser() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateUserDto }) =>
      updateUserAction(id, payload),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ['users'] });
      qc.invalidateQueries({ queryKey: [`user-${id}`] });
    },
  });
}
