'use client';

import { useState, useCallback, useRef } from 'react';
import { DEFAULT_SECTOR, UserStatus } from '../constants';
import type { User, CreateUserDto, UpdateUserDto } from '../types';
import { useUpdateUser, useCreateUser } from './useUsers';
import { Toast } from 'primereact/toast';

/**
 * Construye valores iniciales del formulario para creación o edición
 */
function buildInitialForm(user?: User): CreateUserDto {
  return {
    usuario: user?.usuario ?? '',
    estado: user?.estado ?? UserStatus.ACTIVO,
    sector: user?.sector ?? DEFAULT_SECTOR,
  };
}

/**
 * Hook que maneja el formulario de usuario:
 * - Control del modal
 * - Mutaciones create/update
 * - Notificaciones Toast
 */
export function useUserForm() {
  // Toast ref para notificaciones
  const toastRef = useRef<Toast>(null);

  // 1. Modal
  const [modalOpen, setModalOpen] = useState(false);
  // 2. Usuario en edición (null = crear)
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  // 3. Valores del formulario
  const [formValues, setFormValues] = useState<CreateUserDto>(() => buildInitialForm());

  // 4. Mutations
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();

  /** Abre modal en modo creación */
  const openCreate = () => {
    setCurrentUser(null);
    setFormValues(buildInitialForm());
    setModalOpen(true);
  };

  /** Abre modal en modo edición */
  const openEdit = (user: User) => {
    setCurrentUser(user);
    setFormValues(buildInitialForm(user));
    setModalOpen(true);
  };

  /** Cierra modal y resetea formulario */
  const closeForm = () => {
    setModalOpen(false);
    setCurrentUser(null);
    setFormValues(buildInitialForm());
  };

  /** Actualiza campo del formulario */
  const setField = useCallback(
    <K extends keyof CreateUserDto>(field: K, value: CreateUserDto[K]) => {
      setFormValues((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  /** Envía formulario y muestra toast */
  const submitForm = async () => {
    try {
      if (currentUser) {
        await updateUser.mutateAsync({ id: currentUser.id, payload: formValues as UpdateUserDto });
        toastRef.current?.show({
          severity: 'success',
          summary: 'Usuario actualizado',
          detail: `Se actualizó "${formValues.usuario}" correctamente`,
          life: 3000,
        });
      } else {
        await createUser.mutateAsync(formValues);
        toastRef.current?.show({
          severity: 'success',
          summary: 'Usuario creado',
          detail: `Se creó "${formValues.usuario}" correctamente`,
          life: 3000,
        });
      }
      closeForm();
    } catch (error) {
      console.error('Error saving user:', error);
      toastRef.current?.show({
        severity: 'error',
        summary: 'Error al guardar',
        detail: `No se pudo ${currentUser ? 'actualizar' : 'crear'} el usuario. Intenta de nuevo.`,
        life: 3000,
      });
    }
  };

  return {
    modalOpen,
    formValues,
    openCreate,
    openEdit,
    closeForm,
    setField,
    submitForm,
    isLoading: createUser.isPending || updateUser.isPending,
    isEdit: Boolean(currentUser),
    toastRef,
  };
}
