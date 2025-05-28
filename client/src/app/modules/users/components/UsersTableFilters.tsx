'use client';

import React from 'react';
import { useUrlFilters } from '../hooks/useUrlFilters';
import { FilterSelect } from '@/app/components/molecules/FilterSelect';
import { SearchBar } from '@/app/components/molecules/SearchBar';
import { Button } from '@/app/components/atoms/Button';
import { SECTOR_OPTIONS, STATUS_OPTIONS } from '../constants';

export const UserTableFilters: React.FC = () => {
  const {
    draft,
    handleSearchChange,
    handleSearchSubmit,
    statusFilter,
    handleEstado,
    sectorFilter,
    handleSector,
  } = useUrlFilters();

  return (
    <div className="flex flex-wrap md:flex-nowrap gap-4 mb-4 items-center">
      {/* Buscador con debounce */}
      <SearchBar
        value={draft}
        onChange={handleSearchChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearchSubmit(draft);
          }
        }}
        placeholder="Buscar por nombre o apellido"
      />

      {/* Filtro por sector */}
      <FilterSelect<number>
        options={SECTOR_OPTIONS}
        value={sectorFilter}
        onChange={(value) => handleSector(value)}
        placeholder="Filtrar por sector"
      />

      {/* Filtro por estado */}
      <FilterSelect<typeof statusFilter>
        options={STATUS_OPTIONS}
        value={statusFilter}
        onChange={(value) => handleEstado(value)}
        placeholder="Filtrar por estado"
      />

      {/* Botones auxiliares (disabled) */}
      <div className="flex gap-2">
        <Button
          icon="pi pi-filter"
          className="text-white p-button-outlined"
          style={{ backgroundColor: 'rgba(100, 116, 139, 1)' }}
          disabled
          aria-label="Aplicar filtro"
        />
        <Button
          icon="pi pi-sliders-h"
          className="text-white p-button-outlined"
          style={{ backgroundColor: 'rgba(100, 116, 139, 1)' }}
          severity="secondary"
          disabled
          aria-label="Ajustes de tabla"
        />
      </div>
    </div>
  );
};
