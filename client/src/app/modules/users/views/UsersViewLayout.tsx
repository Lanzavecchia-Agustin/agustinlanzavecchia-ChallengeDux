'use client';

import React from 'react';
import { Button } from '@/app/components/atoms/Button';
import { Pagination } from '@/app/components/organisms/Pagination';
import { UsersFormModal } from '../components/UsersFormModal';
import { UserTableFilters } from '../components/UsersTableFilters';
import { UserFormContext } from '../context/UserFormContext';
import { useUserForm } from '../hooks/forms/useUserForm';
import { useUrlFilters } from '../hooks/filters/useUrlFilters';

interface UsersViewLayoutProps {
  children: React.ReactNode; // normalmente <UsersTableServer/>
}

export const UsersViewLayout: React.FC<UsersViewLayoutProps> = ({ children }) => {
  // Hook unificado para creación/edición
  const {
    modalOpen,
    currentUser,
    formValues,
    openCreate,
    openEdit,
    closeForm,
    setField,
    submitForm,
    isLoading,
    isEdit,
  } = useUserForm();

  // Hook de filtros: URL-search y paginado
  const {
    page,
    statusFilter,
    sectorFilter,
    draft,
    handleSearchChange,
    handleSearchSubmit,
    handleEstado,
    handleSector,
  } = useUrlFilters();

  return (
    <UserFormContext.Provider value={{ openEdit }}>
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-content-between align-items-center mb-4">
          <h2 className="text-2xl font-bold m-0">Usuarios</h2>
          <Button label="Nuevo Usuario" icon="pi pi-plus" onClick={openCreate} />
        </div>

        {/* Filtros */}
        <UserTableFilters
          searchTerm={draft}
          onSearchTermChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
          statusFilter={statusFilter}
          onStatusChange={handleEstado}
          sectorFilter={sectorFilter}
          onSectorChange={handleSector}
        />

        {/* Tabla (SSR) */}
        {children}

        {/* Paginación */}
        <Pagination
          first={page}
          rows={10}
          totalRecords={0} /* TODO: traer total desde la API */
          onPageChange={() => {}} /* ya manejado por URL */
        />

        {/* Modal para crear/editar */}
        <UsersFormModal
          visible={modalOpen}
          onClose={closeForm}
          onSubmit={submitForm}
          isLoading={isLoading}
          isEdit={isEdit}
          user={currentUser}
          formData={formValues}
          setField={setField}
        />
      </div>
    </UserFormContext.Provider>
  );
};
