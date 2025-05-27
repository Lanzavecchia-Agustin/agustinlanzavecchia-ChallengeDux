'use client';

import { useState, useCallback } from 'react';
import { DEFAULT_SECTOR, UserStatus } from '../../constants';
import type { User, CreateUserDto, UpdateUserDto } from '../../types';
import { useCreateUser } from '../querys/useCreateUser';
import { useUpdateUser } from '../querys/useUpdateUser';

function buildInitialForm(user?: User): CreateUserDto {
  return {
    usuario: user?.usuario ?? '',
    estado: user?.estado ?? UserStatus.ACTIVO,
    sector: user?.sector ?? DEFAULT_SECTOR,
  };
}

export function useUserForm() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [formValues, setFormValues] = useState<CreateUserDto>(() => buildInitialForm());

  const createUser = useCreateUser();
  const updateUser = useUpdateUser();

  const openCreate = () => {
    setCurrentUser(null);
    setFormValues(buildInitialForm());
    setModalOpen(true);
  };

  const openEdit = (user: User) => {
    setCurrentUser(user);
    setFormValues(buildInitialForm(user));
    setModalOpen(true);
  };

  const closeForm = () => {
    setModalOpen(false);
    setCurrentUser(null);
    setFormValues(buildInitialForm());
  };

  const setField = useCallback(
    <K extends keyof CreateUserDto>(field: K, value: CreateUserDto[K]) => {
      setFormValues((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const submitForm = async () => {
    try {
      if (currentUser) {
        await updateUser.mutateAsync({ id: currentUser.id, payload: formValues as UpdateUserDto });
      } else {
        await createUser.mutateAsync(formValues);
      }
      closeForm();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return {
    modalOpen,
    currentUser,
    formValues,
    openCreate,
    openEdit,
    closeForm,
    setField,
    submitForm,
    isLoading: createUser.isPending || updateUser.isPending,
    isEdit: Boolean(currentUser),
  };
}
