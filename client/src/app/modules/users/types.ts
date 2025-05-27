import type { UserStatus } from './constants';

/** Registro completo que devuelve la API */
export interface User {
  id: string; // el json-server genera string numérica
  usuario: string;
  estado: UserStatus; // 👈 mismo nombre que en el back
  sector: number;
}

export interface ListUsersParams {
  page?: number;
  limit?: number;
  q?: string;
  estado?: UserStatus;
}

export type FormPayload = {
  usuario: string;
  estado: UserStatus;
  sector: number;
};

/** DTO usado en POST / personal */
export type CreateUserDto = Omit<User, 'id'>;

/** DTO usado en PATCH / personal/:id  (todos opcionales) */
export type UpdateUserDto = Partial<CreateUserDto>;
