'use client';

import React, { useState } from 'react';
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
    clearFilters,
  } = useUrlFilters();

  // Control de visibilidad para filtros en mobile
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <div className="mb-4">
      {/* Primera fila: buscador + botones */}
      <div className="flex items-center gap-2">
        <SearchBar
          value={draft}
          onChange={handleSearchChange}
          onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit(draft)}
          placeholder="Buscar por nombre o apellido"
        />

        <Button
          icon="pi pi-filter"
          className="text-white p-button-outlined"
          style={{ backgroundColor: 'rgba(100, 116, 139, 1)' }}
          onClick={clearFilters}
          aria-label="Limpiar filtros"
        />

        <Button
          icon="pi pi-sliders-h"
          className="text-white p-button-outlined md:hidden"
          style={{ backgroundColor: 'rgba(100, 116, 139, 1)' }}
          onClick={() => setShowMobileFilters((prev) => !prev)}
          aria-label="Ajustes de filtros"
        />
      </div>

      {/* Desktop: filtros siempre visibles */}
      <div className="hidden md:flex gap-4 mt-4">
        <FilterSelect<number>
          options={SECTOR_OPTIONS}
          value={sectorFilter}
          onChange={handleSector}
          placeholder="Filtrar por sector"
        />

        <FilterSelect<typeof statusFilter>
          options={STATUS_OPTIONS}
          value={statusFilter}
          onChange={handleEstado}
          placeholder="Filtrar por estado"
        />
      </div>

      {/* Mobile: filtros desplegables */}
      {showMobileFilters && (
        <div className="flex flex-col gap-4 mt-4 md:hidden">
          <FilterSelect<number>
            options={SECTOR_OPTIONS}
            value={sectorFilter}
            onChange={handleSector}
            placeholder="Filtrar por sector"
          />
          <FilterSelect<typeof statusFilter>
            options={STATUS_OPTIONS}
            value={statusFilter}
            onChange={handleEstado}
            placeholder="Filtrar por estado"
          />
        </div>
      )}
    </div>
  );
};
