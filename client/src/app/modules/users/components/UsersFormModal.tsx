'use client';

import { Dialog } from 'primereact/dialog';
import { Input } from '@/app/components/atoms/Input';
import { Button } from '@/app/components/atoms/Button';
import { Dropdown } from 'primereact/dropdown';
import { Label } from '@/app/components/atoms/Label';
import { FilterOption } from '@/app/components/molecules/FilterSelect';
import type { FormPayload, User } from '../types';
import { UserStatus } from '../constants';

/* ---------- Props ---------- */
interface UsersFormModalProps {
  visible: boolean;
  isEdit: boolean;

  user: User | null;

  /* Datos controlados */
  form: FormPayload;
  onChange: <K extends keyof FormPayload>(field: K, value: FormPayload[K]) => void;

  /* UX */
  onHide: () => void;
  onSubmit: () => void;
  loading?: boolean;

  /* Listas */
  sectors: FilterOption<number>[];
  statuses: FilterOption<UserStatus>[];
}

/* ---------- Componente ---------- */
export const UsersFormModal: React.FC<UsersFormModalProps> = ({
  visible,
  isEdit,
  form,
  onChange,
  onHide,
  onSubmit,
  loading = false,
  sectors,
  statuses,
}) => {
  return (
    <Dialog
      header={isEdit ? 'Editar Usuario' : 'Nuevo Usuario'}
      visible={visible}
      style={{ width: '40rem' }}
      modal
      onHide={onHide}
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
            <Label htmlFor="usuario">Nombre de Usuario</Label>
            <Input
              id="usuario"
              name="usuario"
              placeholder="Ingrese el nombre del usuario"
              value={form.usuario}
              onChange={(e) => onChange('usuario', e.target.value)}
              required
            />
          </div>

          {/* Estado */}
          <div className="field col-12">
            <Label htmlFor="estado">Estado</Label>
            <Dropdown
              id="estado"
              options={statuses}
              optionLabel="label"
              optionValue="value"
              placeholder="Seleccionar estado"
              className="w-full"
              value={form.estado}
              onChange={(e) => onChange('estado', e.value)}
              required
            />
          </div>

          {/* Sector */}
          <div className="field col-12">
            <Label htmlFor="sector">Sector</Label>
            <Dropdown
              id="sector"
              options={sectors}
              optionLabel="label"
              optionValue="value"
              placeholder="Seleccionar sector"
              className="w-full"
              value={form.sector}
              onChange={(e) => onChange('sector', e.value)}
              required
            />
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-content-end gap-2 mt-4">
          <Button
            type="submit"
            label={isEdit ? 'Actualizar' : 'Crear'}
            icon="pi pi-check"
            disabled={loading}
            loading={loading}
          />
          <Button
            label="Cancelar"
            icon="pi pi-times"
            className="p-button-outlined"
            severity="secondary"
            type="button"
            onClick={onHide}
          />
        </div>
      </form>
    </Dialog>
  );
};
