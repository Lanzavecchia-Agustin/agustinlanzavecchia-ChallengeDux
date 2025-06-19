import type { UserStatus } from './constants';

/** Registro completo que devuelve la API */
export interface User {
  id: string;
  usuario: string;
  estado: UserStatus;
  sector: number;
}

/** Parámetros para listar */
export interface ListUsersParams {
  page?: number;
  limit?: number;
  q?: string;
  estado?: UserStatus;
  sector?: number;
}

/** Para leer de la URL */
export interface SearchParams {
  page?: string;
  q?: string;
  estado?: UserStatus | undefined;
  sector?: string;
}

/** DTO para creación: sector obligatorio */
export interface CreateUserDto {
  usuario: string;
  estado: UserStatus;
  sector: number;
}

/** DTO para edición: todos opcionales */
export type UpdateUserDto = Partial<CreateUserDto>;

export interface UsersContextValue {
  // Modal actions
  openCreateModal: () => void;
  openEditModal: (user: User) => void;
  closeModal: () => void;

  // Toast notifications
  showSuccessToast: (message: string) => void;
  showErrorToast: (message: string) => void;

  // Form state
  isModalOpen: boolean;
  isLoading: boolean;

  // User operations
  deleteUser: (user: User) => Promise<void>;
}
