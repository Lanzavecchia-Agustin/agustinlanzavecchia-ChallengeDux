// src/app/modules/users/actions/user.actions.ts

'use server';

import { revalidateTag } from 'next/cache';
import { usersService } from '../services/users.service';
import type { CreateUserDto, UpdateUserDto } from '../types';

/**
 * Server Action: crea un nuevo usuario.
 * - Ejecuta la mutación con usersService.create
 * - Revalida la tag 'users' para actualizar Server Components relacionados
 */
export async function createUserAction(payload: CreateUserDto) {
  await usersService.create(payload);
  // Revalida los componentes que usan la tag 'users'
  revalidateTag('users');
}

/**
 * Server Action: actualiza un usuario existente.
 * - Llama a usersService.update para enviar el patch al backend
 * - Revalida la lista 'users' y el detalle individual 'user-<id>'
 * - Retorna el usuario actualizado
 */
export async function updateUserAction(id: string, payload: UpdateUserDto) {
  const updatedUser = await usersService.update(id, payload);
  // Revalida el listado general de usuarios
  revalidateTag('users');
  // Revalida la caché específica del usuario actualizado
  revalidateTag(`user-${id}`);
  return updatedUser;
}

/**
 * Server Action: elimina un usuario.
 * - Llama a usersService.remove
 * - Revalida la tag 'users' para refrescar listas
 */
export async function deleteUserAction(id: string) {
  await usersService.remove(id);
  // Revalida el listado general de usuarios
  revalidateTag('users');
}
