'use client';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { User } from '../types';

interface UsersTableProps {
  users: User[];
  loading?: boolean;
  onRowSelect?: (user: User) => void;
}

export const UsersTable: React.FC<UsersTableProps> = ({ users, loading = false, onRowSelect }) => {
  return (
    <DataTable<User[]>
      value={users}
      loading={loading}
      rowHover
      onRowClick={(e) => onRowSelect?.(e.data as User)}
      className="cursor-pointer"
    >
      <Column field="id" header="ID" sortable style={{ width: '25%' }} />
      <Column
        field="usuario"
        header="Usuario"
        sortable
        body={(row) => (
          <p className="text-primary underline font-bold custom-capitalize">{row.usuario}</p>
        )}
      />
      <Column
        field="estado"
        header="Estado"
        sortable
        body={(row) => <p className="custom-capitalize secondary-table-text">{row.estado}</p>}
      />
      <Column
        field="sector"
        header="Sector"
        sortable
        body={(row) => <p className="custom-capitalize secondary-table-text">{row.sector}</p>}
      />
    </DataTable>
  );
};
