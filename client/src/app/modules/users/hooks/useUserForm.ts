// src/app/modules/users/hooks/useUserForm.ts

'use client';

import { useState, useCallback } from 'react';
import { DEFAULT_SECTOR, UserStatus } from '../constants';
import type { User, CreateUserDto, UpdateUserDto } from '../types';
import { useUpdateUser, useCreateUser } from './useUsers';

/**
 * Construye los valores iniciales del formulario,
 * ya sea para creación (sin user) o edición (con user)
 */
function buildInitialForm(user?: User): CreateUserDto {
  return {
    usuario: user?.usuario ?? '', // Nombre de usuario
    estado: user?.estado ?? UserStatus.ACTIVO, // Estado inicial (activo de base)
    sector: user?.sector ?? DEFAULT_SECTOR, // Sector por defecto si no existe user
  };
}

/**
 * Hook que maneja el estado y las acciones del formulario de usuario:
 * - Apertura/cierre del modal
 * - Carga de datos iniciales para crear o editar
 * - Envío a través de mutaciones (create/update)
 */
export function useUserForm() {
  // 1) Estado de visibilidad del modal
  const [modalOpen, setModalOpen] = useState(false);
  // 2) Usuario actual en edición (null = modo creación)
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  // 3) Valores del formulario (controlados)
  const [formValues, setFormValues] = useState<CreateUserDto>(() => buildInitialForm());

  // 4) Hooks de mutación para crear/actualizar
  const createUser = useCreateUser(); // mutateAsync para crear nuevo usuario
  const updateUser = useUpdateUser(); // mutateAsync para actualizar usuario existente

  /**
   * Abre el modal en modo creación:
   * - Limpia currentUser
   * - Resetea formValues
   */
  const openCreate = () => {
    setCurrentUser(null);
    setFormValues(buildInitialForm());
    setModalOpen(true);
  };

  /**
   * Abre el modal en modo edición:
   * - Asigna el usuario a editar
   * - Carga sus valores en el formulario
   */
  const openEdit = (user: User) => {
    setCurrentUser(user);
    setFormValues(buildInitialForm(user));
    setModalOpen(true);
  };

  /**
   * Cierra el modal y resetea todos los valores
   */
  const closeForm = () => {
    setModalOpen(false);
    setCurrentUser(null);
    setFormValues(buildInitialForm());
  };

  /**
   * Actualiza un campo específico del formulario
   * - field: nombre de la propiedad en CreateUserDto
   * - value: nuevo valor que se asignará
   */
  const setField = useCallback(
    <K extends keyof CreateUserDto>(field: K, value: CreateUserDto[K]) => {
      setFormValues((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  /**
   * Envía el formulario:
   * - Si hay currentUser, hace update
   * - Si no, crea un nuevo usuario
   * - Cierra el modal al finalizar
   */
  const submitForm = async () => {
    try {
      if (currentUser) {
        // Update: enviar id + payload
        await updateUser.mutateAsync({ id: currentUser.id, payload: formValues as UpdateUserDto });
      } else {
        // Create: enviar payload
        await createUser.mutateAsync(formValues);
      }
      // Cerrar modal tras éxito
      closeForm();
    } catch (error) {
      console.error('Error saving user:', error);
      // Aquí podrías agregar manejo de errores UX (toast, mensaje, etc.)
    }
  };

  return {
    // Estado y valores
    modalOpen, // boolean: muestra/oculta modal
    formValues, // objeto controlado con los valores del formulario

    // Acciones de apertura/cierre
    openCreate,
    openEdit,
    closeForm,

    // Helpers de formulario
    setField, // función para actualizar campos específicos
    submitForm, // función para enviar el formulario

    // Indicadores de estado y modo
    isLoading: createUser.isPending || updateUser.isPending, // si alguna mutación está en progreso
    isEdit: Boolean(currentUser), // true = edición, false = creación
  };
}
