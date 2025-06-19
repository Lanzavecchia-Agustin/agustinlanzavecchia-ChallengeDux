'use client';

import React from 'react';
import { Button } from '@/app/components/atoms/Button';
import { useUsersContext } from '../context/UsersContext';

export function UsersPageHeader() {
  const { openCreateModal } = useUsersContext();

  return (
    <div className="flex justify-content-between align-items-center mb-4 mt-3">
      <h2 className="text-2xl font-bold m-0">Usuarios</h2>
      <Button label="Nuevo Usuario" icon="pi pi-plus" onClick={openCreateModal} />
    </div>
  );
}
