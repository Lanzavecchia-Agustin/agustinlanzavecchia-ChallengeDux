import { apiFetch } from '@/app/lib/api';
import type { User, CreateUserDto, UpdateUserDto } from '../types';
import { UserStatus } from '../constants';

const ENDPOINT = '/personal';

export const usersService = {
  list(params: { page?: number; limit?: number; q?: string; estado?: UserStatus }) {
    const { page = 1, limit = 10, q, estado } = params;
    const search = new URLSearchParams({
      _page: String(page),
      _limit: String(limit),
      ...(q ? { q } : {}),
      ...(estado ? { estado } : {}),
    });
    return apiFetch<User[]>(`${ENDPOINT}?${search.toString()}`, {
      next: { tags: ['users'] },
    });
  },

  create(payload: CreateUserDto) {
    return apiFetch<User>(ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  update(id: string, payload: UpdateUserDto) {
    return apiFetch<User>(`${ENDPOINT}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  },

  remove(id: string) {
    return apiFetch<void>(`${ENDPOINT}/${id}`, { method: 'DELETE' });
  },
};
