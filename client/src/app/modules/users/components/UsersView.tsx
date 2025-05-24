'use client';

import React from 'react';
import { UserTable } from './UserTable';
import { Pagination } from '../../../components/organisms/Pagination';
import { UserFormModal } from './UserFormModal';
import { User } from '../types';
import { TableFilters } from './TableFilters';
import { Button } from '../../../components/atoms/Button';

export const UsersView = () => {
  return (
    <div className="p-4">
      <div className="flex justify-content-between align-items-center mb-4">
        <h2 className="text-2xl font-bold m-0">Usuarios</h2>
        {/* TODO: pasar función real para agregar un nuevo usuario */}
        <Button label="Nuevo Usuario" icon="pi pi-plus" onClick={() => {}} />
      </div>

      {/* TODO: pasar las props necesarias */}
      <TableFilters />

      {/* TODO: pasar usuarios reales */}
      {/* TODO: pasar total de registros real */}
      <UserTable users={[]} onRowSelect={() => {}} loading={false} />

      {/* TODO: pasar total de registros real */}
      {/* TODO: pasar paginación real */}
      <Pagination first={1} rows={10} totalRecords={0} onPageChange={() => {}} />

      <UserFormModal
        visible={false}
        onHide={() => {}} /* TODO: pasar función real */
        onSubmit={() => {}} /* TODO: pasar función real */
        sectors={[]} /* TODO: pasar opciones reales de sector */
        statuses={[]} /* TODO: pasar opciones reales de estado */
      />
    </div>
  );
};

export default UsersView;
