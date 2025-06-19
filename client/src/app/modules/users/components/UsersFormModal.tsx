'use client';

import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from '@/app/components/atoms/Button';
import { useUsersContext } from '../context/UsersContext';
import { UserStatus } from '../constants';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { SECTOR_OPTIONS } from '../constants';

export function UsersFormModal() {
  const { isModalOpen, currentUser, formValues, closeModal, setField, submitForm, isFormLoading } =
    useUsersContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitForm();
    } catch {}
  };

  const isEdit = Boolean(currentUser);

  return (
    <Dialog
      visible={isModalOpen}
      onHide={closeModal}
      header={isEdit ? 'Editar usuario' : 'Nuevo usuario'}
      modal
      style={{ width: '40rem' }}
    >
      <form className="p-fluid" onSubmit={handleSubmit}>
        <div className="grid formgrid">
          {/* Usuario */}
          <div className="field col-12">
            <label htmlFor="usuario">Nombre de usuario</label>
            <InputText
              id="usuario"
              value={formValues.usuario}
              onChange={(e) => setField('usuario', e.target.value)}
              required
            />
          </div>

          {/* Estado */}
          <div className="field col-12">
            <label htmlFor="estado">Estado</label>
            <Dropdown
              id="estado"
              value={formValues.estado}
              options={[
                { label: 'Activo', value: UserStatus.ACTIVO },
                { label: 'Inactivo', value: UserStatus.INACTIVO },
              ]}
              onChange={(e) => setField('estado', e.value)}
              required
            />
          </div>

          {/* Sector */}
          <div className="field col-12">
            <label htmlFor="sector">Sector</label>
            <Dropdown
              id="sector"
              value={formValues.sector}
              options={SECTOR_OPTIONS}
              optionLabel="label"
              optionValue="value"
              onChange={(e) => setField('sector', e.value)}
              placeholder="Seleccionar sector"
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            type="submit"
            label={isEdit ? 'Actualizar' : 'Crear'}
            loading={isFormLoading}
            disabled={isFormLoading}
          />
          <Button
            type="button"
            label="Cancelar"
            className="p-button-outlined"
            severity="secondary"
            onClick={closeModal}
          />
        </div>
      </form>
    </Dialog>
  );
}
