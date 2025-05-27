'use client';

import React from 'react';
import { FilterSelect } from '../../../components/molecules/FilterSelect';
import type { FilterOption } from '../../../components/molecules/FilterSelect';
import { SearchBar } from '../../../components/molecules/SearchBar';
import { Button } from '../../../components/atoms/Button';
import type { UserStatus } from '../constants';

interface UserTableFiltersProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  statusOptions: FilterOption<UserStatus>[];
  statusFilter: UserStatus;
  onStatusChange: (status: UserStatus) => void;
  sectorOptions: FilterOption<number>[];
  sectorFilter: number;
  onSectorChange: (sector: number) => void;
}

export const UserTableFilters: React.FC<UserTableFiltersProps> = ({
  searchTerm,
  onSearchTermChange,
  statusOptions,
  statusFilter,
  onStatusChange,
  sectorOptions,
  sectorFilter,
  onSectorChange,
}) => (
  <div className="flex gap-4 mb-4 items-center">
    <SearchBar
      value={searchTerm}
      onChange={onSearchTermChange}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onSearchTermChange(searchTerm);
        }
      }}
      placeholder="Buscar por nombre o apellido"
    />

    <FilterSelect<number>
      options={sectorOptions}
      value={sectorFilter}
      onChange={onSectorChange}
      placeholder="Filtrar por sector"
    />

    <FilterSelect<UserStatus>
      options={statusOptions}
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
