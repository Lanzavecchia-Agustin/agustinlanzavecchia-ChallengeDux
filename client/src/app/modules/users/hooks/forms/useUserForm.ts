'use client';

import { useState, useCallback } from 'react';
import type { FormPayload, User } from '../../types';
import { UserStatus } from '../../constants';
import { useCreateUser } from '../querys/useCreateUser';
import { useUpdateUser } from '../querys/useUpdateUser';

/* ---------- Estado inicial ---------- */
const emptyForm: FormPayload = {
  usuario: '',
  estado: UserStatus.ACTIVO,
  sector: 0, // 0  ➜  “sin sector seleccionado”
};

/* ---------- Hook ---------- */
export function useUserForm() {
  /* UI state */
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form, setForm] = useState<FormPayload>(emptyForm);

  /* Data-mutations */
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();

  /* Helpers ------------------------------------------------------ */

  /** Abre modal para CREACIÓN */
  const openCreate = () => {
    setEditingUser(null);
    setForm(emptyForm);
    setModalVisible(true);
  };

  /** Abre modal para EDICIÓN */
  const openEdit = (user: User) => {
    setEditingUser(user);
    setForm({
      usuario: user.usuario,
      estado: user.estado,
      sector: user.sector,
    });
    setModalVisible(true);
  };

  /** Cierra modal y reinicia estado local */
  const close = () => {
    setModalVisible(false);
    setEditingUser(null);
    setForm(emptyForm);
  };

  /** Handler genérico para cambiar cualquier campo */
  const handleChange = useCallback(
    <K extends keyof FormPayload>(field: K, value: FormPayload[K]) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  /** Enviar al backend */
  const handleSubmit = async () => {
    try {
      if (editingUser) {
        await updateUser.mutateAsync({ id: editingUser.id, payload: form });
      } else {
        await createUser.mutateAsync(form);
      }
      close();
    } catch (err) {
      // TODO: mostrar toast / alert al usuario
      console.error('❌ Error al guardar usuario:', err);
    }
  };

  /* ---------- API pública del hook ---------- */
  return {
    /* estado del modal */
    editingUser,
    modalVisible,
    openCreate,
    openEdit,
    close,

    /* valores del formulario */
    form,
    handleChange,

    /* submit & loading */
    handleSubmit,
    loading: createUser.isPending || updateUser.isPending,
    isEdit: Boolean(editingUser),
  };
}
