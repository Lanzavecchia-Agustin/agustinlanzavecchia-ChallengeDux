import { apiFetch } from '@/app/lib/api';
import type { ListUsersParams, User, CreateUserDto, UpdateUserDto } from '../types';

const ENDPOINT = '/personal';

export const usersService = {
  list(params: ListUsersParams) {
    const { page = 1, limit = 10, q, estado, sector } = params;
    const query = new URLSearchParams({
      _page: String(page),
      _limit: String(limit),
      ...(q ? { q } : {}),
      ...(estado ? { estado } : {}),
      ...(sector != null ? { sector: String(sector) } : {}),
    });
    return apiFetch<User[]>(`${ENDPOINT}?${query}`);
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
    return apiFetch<void>(`${ENDPOINT}/${id}`, {
      method: 'DELETE',
    });
  },
};
