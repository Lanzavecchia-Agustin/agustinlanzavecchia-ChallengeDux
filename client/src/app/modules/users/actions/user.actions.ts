'use server';

import { revalidateTag } from 'next/cache';
import { usersService } from '../services/users.service';
import type { CreateUserDto, UpdateUserDto } from '../types';

const SECTOR = Number(process.env.NEXT_PUBLIC_SECTOR_ID);

export async function createUserAction(payload: CreateUserDto) {
  await usersService.create({ ...payload, sector: SECTOR });
  revalidateTag('users');
}

export async function updateUserAction(id: string, payload: UpdateUserDto) {
  await usersService.update(id, payload);
  revalidateTag('users');
  revalidateTag(`user-${id}`);
}

export async function deleteUserAction(id: string) {
  await usersService.remove(id);
  revalidateTag('users');
}
