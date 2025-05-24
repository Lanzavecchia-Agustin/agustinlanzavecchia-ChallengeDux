'use client';

import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { User } from '../types';

interface UserTableProps {
  users: User[];
  loading?: boolean;
  onRowSelect?: (user: User) => void;
}

export const UserTable: React.FC<UserTableProps> = ({ users, loading = false, onRowSelect }) => (
  <DataTable<User[]>
    value={users}
    loading={loading}
    rowHover
    onRowClick={(e) => onRowSelect?.(e.data as User)}
    className="surface-card border-round shadow-1"
  >
    <Column field="id" header="ID" sortable style={{ width: '25%' }} />
    <Column
      field="usuario"
      header="Usuario"
      sortable
      body={(row) => <a className="text-primary">{row.usuario}</a>}
    />
    <Column field="estado" header="Estado" sortable />
    <Column field="sector" header="Sector" sortable />
  </DataTable>
);
