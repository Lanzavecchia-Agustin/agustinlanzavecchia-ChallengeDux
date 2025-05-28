// src/app/modules/users/services/users.service.ts

import { apiFetch } from '@/app/lib/api';
import type { ListUsersParams, User, CreateUserDto, UpdateUserDto } from '../types';

const BASE = process.env.API_BASE!; // Ej: https://staging.duxsoftware.com.ar/api-test
const ENDPOINT = '/personal';

export const usersService = {
  /**
   * CSR: devuelve solo el array de usuarios.
   * React-Query usará este método.
   */
  list(params: ListUsersParams): Promise<User[]> {
    const qp = new URLSearchParams({
      _page: String(params.page ?? 1),
      _limit: String(params.limit ?? 10),
      ...(params.q ? { q: params.q } : {}),
      ...(params.estado ? { estado: params.estado } : {}),
      ...(params.sector != null ? { sector: String(params.sector) } : {}),
    });
    return apiFetch<User[]>(`${ENDPOINT}?${qp.toString()}`);
  },

  /**
   * SSR: devuelve items + total (X-Total-Count header).
   * Usado en Server Component para paginación.
   */
  async listWithCount(params: ListUsersParams): Promise<{ items: User[]; total: number }> {
    const qp = new URLSearchParams({
      _page: String(params.page ?? 1),
      _limit: String(params.limit ?? 10),
      ...(params.q ? { q: params.q } : {}),
      ...(params.estado ? { estado: params.estado } : {}),
      ...(params.sector != null ? { sector: String(params.sector) } : {}),
    });

    // Construye URL absoluta para evitar descartar path
    const url = `${BASE}${ENDPOINT}?${qp.toString()}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`Error cargando usuarios: ${res.status} ${res.statusText}`);
    }

    const items = (await res.json()) as User[];
    const total = Number(res.headers.get('X-Total-Count') ?? items.length);
    return { items, total };
  },

  /** Crea un nuevo usuario */
  create(payload: CreateUserDto) {
    return apiFetch<User>(ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  /** Actualiza un usuario existente */
  update(id: string, payload: UpdateUserDto) {
    return apiFetch<User>(`${ENDPOINT}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  },

  /** Elimina un usuario por ID */
  remove(id: string) {
    return apiFetch<void>(`${ENDPOINT}/${id}`, {
      method: 'DELETE',
    });
  },
};
