'use client';

import { Toast } from 'primereact/toast';
import { Button } from '../components/atoms/Button';
import { Header } from '../components/organisms/Header';
import { Sidebar } from '../components/organisms/Sidebar';
import { UsersFormModal } from '../modules/users/components/UsersFormModal';
import { UserTableFilters } from '../modules/users/components/UsersTableFilters';
import { UserFormContext } from '../modules/users/context/UserFormContext';
import { useUserForm } from '../modules/users/hooks/useUserForm';

export default function UsersLayout({ children }: { children: React.ReactNode }) {
  const {
    modalOpen,
    formValues,
    openCreate,
    openEdit,
    closeForm,
    setField,
    submitForm,
    isLoading,
    isEdit,
    toastRef,
  } = useUserForm();

  return (
    <UserFormContext.Provider value={{ openEdit }}>
      <div>
        <Header />
        <div>
          {/* Header + botón */}
          <div className="flex w-full min-h-screen">
            <Sidebar />
            <div className="mx-4 w-full">
              <div className="flex justify-content-between align-items-center mb-4 mt-3">
                <h2 className="text-2xl font-bold m-0">Usuarios</h2>
                <Button label="Nuevo Usuario" icon="pi pi-plus" onClick={openCreate} />
              </div>

              {/* Filtros */}
              <UserTableFilters />
              {/* Tabla (SSR) */}
              {children}
            </div>
          </div>

          <Toast ref={toastRef} />
          {/* Modal crear / editar */}
          <UsersFormModal
            visible={modalOpen}
            onClose={closeForm}
            onSubmit={submitForm}
            isLoading={isLoading}
            isEdit={isEdit}
            formData={formValues}
            setField={setField}
          />
        </div>
      </div>
    </UserFormContext.Provider>
  );
}
