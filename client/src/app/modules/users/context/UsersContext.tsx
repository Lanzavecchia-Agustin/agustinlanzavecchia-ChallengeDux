'use client';

import React, { createContext, useContext, useRef, useState, useCallback } from 'react';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import type { User, CreateUserDto, UpdateUserDto } from '../types';
import { useDeleteUser, useCreateUser, useUpdateUser } from '../hooks/useUsers';
import { DEFAULT_SECTOR, UserStatus } from '../constants';

// ==============================
// CONTEXT INTERFACE
// ==============================
interface UsersContextValue {
  isModalOpen: boolean;
  currentUser: User | null;
  formValues: CreateUserDto;

  openCreateModal: () => void;
  openEditModal: (user: User) => void;
  closeModal: () => void;

  setField: <K extends keyof CreateUserDto>(field: K, value: CreateUserDto[K]) => void;
  submitForm: () => Promise<void>;
  resetForm: () => void;

  showSuccessToast: (message: string) => void;
  showErrorToast: (message: string) => void;

  isFormLoading: boolean;

  deleteUser: (user: User) => Promise<void>;
}

// ==============================
// CONTEXT DECLARATION
// ==============================
const UsersContext = createContext<UsersContextValue | null>(null);

// ==============================
// INITIAL FORM GENERATOR
// ==============================
function buildInitialForm(user?: User | null): CreateUserDto {
  return {
    usuario: user?.usuario ?? '',
    estado: user?.estado ?? UserStatus.ACTIVO,
    sector: user?.sector ?? DEFAULT_SECTOR,
  };
}

// ==============================
// PROVIDER COMPONENT
// ==============================
export function UsersProvider({ children }: { children: React.ReactNode }) {
  const toastRef = useRef<Toast>(null);

  // ------------------------------
  // STATE
  // ------------------------------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [formValues, setFormValues] = useState<CreateUserDto>(() => buildInitialForm());

  // ------------------------------
  // MUTATIONS (API hooks)
  // ------------------------------
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUserMutation = useDeleteUser();

  // ------------------------------
  // TOAST HELPERS
  // ------------------------------
  const showSuccessToast = useCallback((message: string) => {
    toastRef.current?.show({ severity: 'success', summary: 'Éxito', detail: message, life: 3000 });
  }, []);

  const showErrorToast = useCallback((message: string) => {
    toastRef.current?.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
  }, []);

  // ------------------------------
  // MODAL ACTIONS
  // ------------------------------
  const openCreateModal = useCallback(() => {
    setCurrentUser(null);
    setFormValues(buildInitialForm());
    setIsModalOpen(true);
  }, []);

  const openEditModal = useCallback((user: User) => {
    setCurrentUser(user);
    setFormValues(buildInitialForm(user));
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setCurrentUser(null);
    setFormValues(buildInitialForm());
  }, []);

  // ------------------------------
  // FORM ACTIONS
  // ------------------------------
  const setField = useCallback(
    <K extends keyof CreateUserDto>(field: K, value: CreateUserDto[K]) => {
      setFormValues((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const resetForm = useCallback(() => {
    setFormValues(buildInitialForm(currentUser));
  }, [currentUser]);

  const submitForm = useCallback(async () => {
    try {
      if (currentUser) {
        await updateUser.mutateAsync({ id: currentUser.id, payload: formValues as UpdateUserDto });
        showSuccessToast(`Usuario "${formValues.usuario}" actualizado exitosamente`);
      } else {
        await createUser.mutateAsync(formValues);
        showSuccessToast(`Usuario "${formValues.usuario}" creado exitosamente`);
      }
      closeModal();
    } catch (error) {
      const action = currentUser ? 'actualizar' : 'crear';
      showErrorToast(`No se pudo ${action} el usuario. Inténtalo de nuevo.`);
      throw error;
    }
  }, [
    currentUser,
    formValues,
    createUser,
    updateUser,
    showSuccessToast,
    showErrorToast,
    closeModal,
  ]);

  // ------------------------------
  // DELETE ACTION WITH CONFIRM
  // ------------------------------
  const deleteUser = useCallback(
    async (user: User) => {
      return new Promise<void>((resolve, reject) => {
        confirmDialog({
          message: `¿Estás seguro de que quieres eliminar al usuario "${user.usuario}"?`,
          header: 'Confirmar eliminación',
          icon: 'pi pi-exclamation-triangle',
          acceptClassName: 'p-button-danger',
          acceptLabel: 'Eliminar',
          rejectLabel: 'Cancelar',
          accept: async () => {
            try {
              await deleteUserMutation.mutateAsync(user.id);
              if (isModalOpen && currentUser?.id === user.id) {
                closeModal();
              }
              showSuccessToast(`Usuario "${user.usuario}" eliminado exitosamente`);
              resolve();
            } catch (error) {
              showErrorToast('No se pudo eliminar el usuario. Inténtalo de nuevo.');
              reject(error);
            }
          },
          reject: () => reject(new Error('Eliminación cancelada')),
        });
      });
    },
    [deleteUserMutation, isModalOpen, currentUser, closeModal, showSuccessToast, showErrorToast],
  );

  // ------------------------------
  // CONTEXT VALUE
  // ------------------------------
  const contextValue: UsersContextValue = {
    isModalOpen,
    currentUser,
    formValues,
    openCreateModal,
    openEditModal,
    closeModal,
    setField,
    submitForm,
    resetForm,
    showSuccessToast,
    showErrorToast,
    isFormLoading: createUser.isPending || updateUser.isPending,
    deleteUser,
  };

  return (
    <UsersContext.Provider value={contextValue}>
      {children}
      <Toast ref={toastRef} />
      <ConfirmDialog />
    </UsersContext.Provider>
  );
}

// ==============================
// HOOK TO USE CONTEXT
// ==============================
export function useUsersContext(): UsersContextValue {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error('useUsersContext must be used within a UsersProvider');
  }
  return context;
}
