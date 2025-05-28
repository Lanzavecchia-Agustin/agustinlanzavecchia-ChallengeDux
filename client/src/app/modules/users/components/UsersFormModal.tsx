// src/app/modules/users/components/UsersFormModal.tsx
'use client';

import { Dialog } from 'primereact/dialog';
import { Input } from '@/app/components/atoms/Input';
import { Dropdown } from 'primereact/dropdown';
import { Label } from '@/app/components/atoms/Label';
import { Button } from '@/app/components/atoms/Button';
import type { CreateUserDto } from '../types';
import { STATUS_OPTIONS, SECTOR_OPTIONS, UserStatus } from '../constants';

interface UsersFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isLoading?: boolean;
  isEdit: boolean;
  formData: CreateUserDto;
  setField: <K extends keyof CreateUserDto>(field: K, value: CreateUserDto[K]) => void;
}

export const UsersFormModal: React.FC<UsersFormModalProps> = ({
  visible,
  onClose,
  onSubmit,
  isLoading = false,
  isEdit,
  formData,
  setField,
}) => {
  const sectorValue = formData.sector;

  return (
    <Dialog
      header={isEdit ? 'Editar usuario' : 'Nuevo usuario'}
      visible={visible}
      modal
      onHide={onClose}
      style={{ width: '40rem' }}
    >
      <form
        className="p-fluid"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="grid formgrid">
          {/* Usuario */}
          <div className="field col-12">
            <Label htmlFor="usuario">Nombre de usuario</Label>
            <Input
              id="usuario"
              name="usuario"
              placeholder="Nombre único"
              value={formData.usuario}
              onChange={(e) => setField('usuario', e.target.value)}
              required
            />
          </div>

          {/* Estado */}
          <div className="field col-12">
            <Label htmlFor="estado">Estado</Label>
            <Dropdown
              id="estado"
              options={STATUS_OPTIONS}
              optionLabel="label"
              optionValue="value"
              value={formData.estado}
              onChange={(e) => setField('estado', e.value as UserStatus)}
              required
            />
          </div>

          {/* Sector */}
          <div className="field col-12">
            <Label htmlFor="sector">Sector</Label>
            <Dropdown
              id="sector"
              options={SECTOR_OPTIONS}
              optionLabel="label"
              optionValue="value"
              value={sectorValue}
              onChange={(e) => setField('sector', e.value)}
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            type="submit"
            label={isEdit ? 'Actualizar' : 'Crear'}
            loading={isLoading}
            disabled={isLoading}
          />
          <Button
            type="button"
            label="Cancelar"
            className="p-button-outlined"
            severity="secondary"
            onClick={onClose}
          />
        </div>
      </form>
    </Dialog>
  );
};
