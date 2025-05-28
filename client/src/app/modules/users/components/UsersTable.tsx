'use client';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';
import { User } from '../types';

interface UsersTableProps {
  users: User[];
  loading?: boolean;
  onRowSelect?: (user: User) => void;
  onDelete?: (user: User) => void;
  deletingUserId?: boolean;
}

export const UsersTable: React.FC<UsersTableProps> = ({
  users,
  loading = false,
  onRowSelect,
  onDelete,
}) => {
  const handleDeleteClick = (user: User, event: React.MouseEvent) => {
    event.stopPropagation();

    confirmDialog({
      message: `¿Estás seguro que deseas eliminar al usuario "${user.usuario}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      accept: () => {
        onDelete?.(user);
      },
    });
  };

  const actionBodyTemplate = (rowData: User) => {
    return (
      <div className="flex justify-content-center">
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-text p-button-danger"
          onClick={(e) => handleDeleteClick(rowData, e)}
          tooltip="Eliminar usuario"
          tooltipOptions={{ position: 'top' }}
        />
      </div>
    );
  };

  return (
    <DataTable<User[]>
      value={users}
      loading={loading}
      rowHover
      onRowClick={(e) => onRowSelect?.(e.data as User)}
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
