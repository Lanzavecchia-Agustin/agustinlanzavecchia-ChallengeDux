'use client';

import { Button } from '@/app/components/atoms/Button';
import { UsersFormModal } from '../components/UsersFormModal';
import { UserTableFilters } from '../components/UsersTableFilters';
import { Pagination } from '@/app/components/organisms/Pagination';
import { UserStatus, UserStatus as UserStatusEnum } from '../constants';
import { UserFormContext } from '../context/UserFormContext';
import { useUserForm } from '../hooks/forms/useUserForm';
import type { FilterOption } from '@/app/components/molecules/FilterSelect';

const STATUS_OPTIONS: FilterOption<UserStatus>[] = [
  { label: 'Activo', value: UserStatusEnum.ACTIVO },
  { label: 'Inactivo', value: UserStatusEnum.INACTIVO },
];

const SECTOR_OPTIONS: FilterOption<number>[] = [{ label: 'Sector 7000', value: 7000 }];

interface Props {
  page: number;
  children: React.ReactNode;
}

export const UsersViewLayout = ({ page, children }: Props) => {
  const {
    form,
    modalVisible,
    editingUser,
    openCreate,
    openEdit,
    close,
    handleSubmit,
    handleChange,
    loading,
    isEdit,
  } = useUserForm();

  return (
    <UserFormContext.Provider value={{ openEdit }}>
      <div className="p-4">
        <div className="flex justify-content-between align-items-center mb-4">
          <h2 className="text-2xl font-bold m-0">Usuarios</h2>
          <Button label="Nuevo Usuario" icon="pi pi-plus" onClick={openCreate} />
        </div>

        <UserTableFilters />

        {children}

        <Pagination first={page} rows={10} totalRecords={0} onPageChange={() => {}} />

        <UsersFormModal
          /* ---- visibility / UX ---- */
          visible={modalVisible}
          onHide={close}
          onSubmit={handleSubmit}
          loading={loading}
          /* ---- data ---- */
          user={editingUser}
          form={form}
          onChange={handleChange}
          isEdit={isEdit}
          /* ---- lists ---- */
          sectors={SECTOR_OPTIONS}
          statuses={STATUS_OPTIONS}
        />
      </div>
    </UserFormContext.Provider>
  );
};
