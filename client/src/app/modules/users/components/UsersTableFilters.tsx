'use client';

import React from 'react';
import { FilterSelect } from '../../../components/molecules/FilterSelect';
import { SearchBar } from '../../../components/molecules/SearchBar';
import { Button } from '../../../components/atoms/Button';
import { SECTOR_OPTIONS, STATUS_OPTIONS, type UserStatus } from '../constants';

interface UserTableFiltersProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  statusFilter: UserStatus;
  onStatusChange: (status: UserStatus) => void;

  sectorFilter: number;
  onSectorChange: (sector: number) => void;
  onSearchSubmit?: (term: string) => void;
}

export const UserTableFilters: React.FC<UserTableFiltersProps> = ({
  searchTerm,
  onSearchTermChange,
  statusFilter,
  onStatusChange,
  sectorFilter,
  onSectorChange,
  onSearchSubmit,
}) => (
  <div className="flex flex-wrap md:flex-nowrap gap-4 mb-4 items-center">
    <SearchBar
      value={searchTerm}
      onChange={onSearchTermChange}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onSearchSubmit ? onSearchSubmit(searchTerm) : onSearchTermChange(searchTerm);
        }
      }}
      placeholder="Buscar por nombre o apellido"
    />

    <FilterSelect<number>
      options={SECTOR_OPTIONS}
      value={sectorFilter}
      onChange={onSectorChange}
      placeholder="Filtrar por sector"
    />

    <FilterSelect<UserStatus>
      options={STATUS_OPTIONS}
      value={statusFilter}
      onChange={onStatusChange}
      placeholder="Filtrar por estado"
    />

    <div className="flex gap-2">
      <Button
        icon="pi pi-filter"
        className="text-white  p-button-outlined"
        style={{ backgroundColor: 'rgba(100, 116, 139, 1)' }}
        disabled
        aria-label="Aplicar filtro"
      />
      <Button
        icon="pi pi-sliders-h"
        className="text-white p-button-outlined"
        style={{ backgroundColor: 'rgba(100, 116, 139, 1)' }}
        disabled
        aria-label="Ajustes de tabla"
        severity="secondary"
      />
    </div>
  </div>
);
