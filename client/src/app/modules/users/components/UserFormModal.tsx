'use client';

import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Input } from '../../../components/atoms/Input';
import { Button } from '../../../components/atoms/Button';
import { Dropdown } from 'primereact/dropdown';
import { User } from '../types';
import { FilterOption } from '../../../components/molecules/FilterSelect';
import { Label } from '../../../components/atoms/Label';

interface UserFormModalProps {
  visible: boolean;
  user?: User;
  onHide: () => void;
  onSubmit: (user: Partial<User>) => void;
  sectors: FilterOption<string>[];
  statuses: FilterOption<string>[];
}

export const UserFormModal: React.FC<UserFormModalProps> = ({
  visible,
  user,
  onHide,
  // onSubmit,
  sectors,
  statuses,
}) => {
  const isEdit = Boolean(user);
  return (
    <Dialog
      header={isEdit ? 'Editar Usuario' : 'Nuevo Usuario'}
      visible={visible}
      style={{ width: '40rem' }}
      modal
      onHide={onHide}
    >
      <form className="p-fluid">
        <div className="grid formgrid">
          <div className="field col-12">
            <Label htmlFor="id">ID</Label>
            <Input id="id" name="id" placeholder="Ingrese el id del Usuario" />
          </div>
          <div className="field col-12">
            <Label htmlFor="name">Nombre</Label>
            <Input id="name" name="name" placeholder="Ingrese el nombre del usuario" />
          </div>
          <div className="field col-12">
            <Label htmlFor="status">Estado</Label>
            <Dropdown
              id="status"
              options={statuses}
              placeholder="Seleccionar estado"
              className="w-full"
            />
          </div>
          <div className="field col-12">
            <Label htmlFor="sector">Sector</Label>
            <Dropdown
              id="sector"
              options={sectors}
              placeholder="Seleccionar sector"
              className="w-full"
            />
          </div>
        </div>
        <div className="flex justify-content-end gap-2 mt-4">
          <Button label="Confirmar" icon="pi pi-check" />
          <Button
            label="Cancelar"
            icon="pi pi-times"
            className="p-button-outlined"
            severity="secondary"
            onClick={onHide}
          />
        </div>
      </form>
    </Dialog>
  );
};
