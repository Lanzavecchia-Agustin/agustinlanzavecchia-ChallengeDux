'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { UserStatus } from '../../constants';
import { SearchParams } from '../../types';

/** Hook que centraliza TODO lo de los filtros */
export function useUrlFilters(debounceMs = 400) {
  const sp = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  /** 1. Raw (string) ← URLSearchParams */
  const raw: SearchParams = {
    q: sp.get('q') ?? undefined,
    estado: sp.get('estado') ?? undefined,
    sector: sp.get('sector') ?? undefined,
    page: sp.get('page') ?? undefined,
  };

  /** 2. Page (número) ← raw.page */
  const page = Number(raw.page ?? '1');

  /** 3. Typed filters para selects */
  const statusFilter = (raw.estado as UserStatus) ?? UserStatus.ACTIVO;
  const sectorFilter = raw.sector ? Number(raw.sector) : 0;

  /** 4. Draft local para la barra de búsqueda */
  const [draft, setDraft] = useState(raw.q ?? '');

  /** Sincroniza draft si la URL cambia externamente */
  useEffect(() => {
    setDraft(raw.q ?? '');
  }, [raw.q]);

  /** 5. Función para parchear la URL y resetear page=1 */
  const patchUrl = useCallback(
    (patch: Partial<SearchParams>) => {
      const params = new URLSearchParams(sp.toString());
      Object.entries(patch).forEach(([k, v]) => {
        if (v === null || v === undefined || v === '') params.delete(k);
        else params.set(k, v);
      });
      params.set('page', '1');
      router.replace(`${pathname}?${params.toString()}`);
      router.refresh();
    },
    [sp, pathname, router],
  );

  /** 6. Debounce para el buscador */
  const debounced = useDebouncedCallback((term: string) => patchUrl({ q: term }), debounceMs, {
    maxWait: debounceMs * 2,
  });

  /** Handlers que expone el hook */
  const handleSearchChange = (term: string) => {
    setDraft(term);
    debounced(term);
  };

  const handleSearchSubmit = (term: string) => {
    debounced.flush();
    patchUrl({ q: term });
  };

  const handleEstado = (estado: UserStatus) => patchUrl({ estado });

  const handleSector = (sector: number) =>
    patchUrl({ sector: sector ? String(sector) : undefined });

  return {
    /** Raw + parsed */
    raw,
    page,
    statusFilter,
    sectorFilter,

    /** Búsqueda */
    draft,
    handleSearchChange,
    handleSearchSubmit,

    /** Selects */
    handleEstado,
    handleSector,
  };
}
