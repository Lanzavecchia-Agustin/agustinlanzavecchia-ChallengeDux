'use client';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { User } from '../types';
import { useUsersContext } from '../context/UsersContext';

interface UsersTableProps {
  users: User[];
  loading?: boolean;
  onRowSelect?: (user: User) => void;
  onDelete?: (user: User) => void;
  deletingUserId?: boolean;
}

export const UsersTable: React.FC<UsersTableProps> = ({ users, loading = false, onRowSelect }) => {
  const { deleteUser } = useUsersContext();

  const handleDeleteClick = async (user: User, event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      await deleteUser(user);
    } catch {}
  };

  const actionBodyTemplate = (rowData: User) => {
    return (
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-text p-button-danger action-button"
        onClick={(e) => handleDeleteClick(rowData, e)}
        tooltip="Eliminar usuario"
        tooltipOptions={{ position: 'top' }}
      />
    );
  };

  return (
    <DataTable<User[]>
      value={users}
      loading={loading}
      rowHover
      onRowClick={(e) => onRowSelect?.(e.data as User)} // ← Esto solo se llama si no se propagó el evento
      className="cursor-pointer"
    >
      <Column field="id" header="ID" sortable style={{ width: '20%' }} />
      <Column
        field="usuario"
        header="Usuario"
        sortable
        style={{ width: '30%' }}
        body={(row) => (
          <p className="text-primary underline font-bold custom-capitalize">{row.usuario}</p>
        )}
      />
      <Column
        field="estado"
        header="Estado"
        sortable
        style={{ width: '20%' }}
        body={(row) => <p className="custom-capitalize secondary-table-text">{row.estado}</p>}
      />
      <Column
        field="sector"
        header="Sector"
        sortable
        style={{ width: '20%' }}
        body={(row) => <p className="custom-capitalize secondary-table-text">{row.sector}</p>}
      />
      <Column
        header="Acciones"
        body={actionBodyTemplate}
        style={{ width: '10%' }}
        className="text-center"
      />
    </DataTable>
  );
};
