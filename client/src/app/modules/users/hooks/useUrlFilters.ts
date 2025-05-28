'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { UserStatus } from '../constants';
import { SearchParams } from '../types';

/**
 * Hook que centraliza la lógica de lectura y actualización de filtros
 * via URL: búsqueda (`q`), estado, sector y paginación.
 */
export function useUrlFilters(debounceMs = 500) {
  // sp: URLSearchParams wrapper de Next para leer query strings
  const sp = useSearchParams();
  // pathname: ruta actual sin query strings
  const pathname = usePathname();
  // router: métodos push/replace y refresh de Next.js
  const router = useRouter();

  /**
   * 1. Lectura CRUDA de parámetros de la URL
   *    - q: término de búsqueda (query), abreviado como `q`.
   *    - estado: string que coincide con UserStatus.
   *    - sector: valor de sector como string.
   *    - page: número de página como string.
   */
  const raw: SearchParams = {
    q: sp.get('q') ?? undefined,
    estado: Object.values(UserStatus).includes(sp.get('estado') as UserStatus)
      ? (sp.get('estado') as UserStatus)
      : undefined,
    sector: sp.get('sector') ?? undefined,
    page: sp.get('page') ?? undefined,
  };

  /**
   * 2. Convertir page de string a número (fallback = 1)
   */
  const page = Number(raw.page ?? '1');

  /**
   * 3. Valores tipados para selects:
   *    - statusFilter: default UserStatus.ACTIVO si no hay raw.estado.
   *    - sectorFilter: default 0 si raw.sector vacío.
   */
  const statusFilter = (raw.estado as UserStatus) ?? UserStatus.ACTIVO;
  const sectorFilter = raw.sector ? Number(raw.sector) : 0;

  /**
   * 4. Estado local para input de búsqueda:
   *    - draft guarda lo que el usuario escribe antes de flush.
   */
  const [draft, setDraft] = useState(raw.q ?? '');

  // Si raw.q cambia (por navegación externa), sincronizar draft
  useEffect(() => {
    setDraft(raw.q ?? '');
  }, [raw.q]);

  /**
   * 5. patchUrl: actualiza la URL sin recargar toda la página
   *    - patch: objeto parcial con claves de SearchParams
   *    - elimina parámetros vacíos
   *    - resetea page a '1'
   *    - usa router.replace para no añadir al historial
   *    - router.refresh para revalidar Server Components
   */
  const patchUrl = useCallback(
    (patch: Partial<SearchParams>) => {
      const params = new URLSearchParams(sp.toString());
      Object.entries(patch).forEach(([k, v]) => {
        if (v === null || v === undefined || v === '') {
          params.delete(k);
        } else {
          params.set(k, v);
        }
      });
      params.set('page', '1');
      router.replace(`${pathname}?${params.toString()}`);
    },
    [sp, pathname, router],
  );

  /**
   * 6. Debounce de búsqueda:
   *    - evita llamar patchUrl en cada pulsación
   *    - flush asegura ejecución inmediata al enviar
   */
  const debounced = useDebouncedCallback(
    (searchTerm: string) => patchUrl({ q: searchTerm }),
    debounceMs,
    {
      maxWait: debounceMs * 2,
    },
  );

  /**
   * HANDLERS expuestos al componente:
   */

  // Al cambiar input de búsqueda, actualiza draft y debounce URL
  const handleSearchChange = (searchTerm: string) => {
    setDraft(searchTerm);
    debounced(searchTerm);
  };

  // Al enviar el formulario (Enter), forza patchUrl inmediatamente
  const handleSearchSubmit = (searchTerm: string) => {
    debounced.flush();
    patchUrl({ q: searchTerm });
  };

  // Cambiar filtro Estado
  const handleEstado = (estado: UserStatus) => patchUrl({ estado });

  // Cambiar filtro Sector (pasar number a string)
  const handleSector = (sector: number) =>
    patchUrl({ sector: sector ? String(sector) : undefined });

  // ---Método para limpiar todos los filtros ---
  const clearFilters = () => {
    setDraft('');
    patchUrl({ q: undefined, estado: undefined, sector: undefined });
  };

  return {
    raw,
    page,
    statusFilter,
    sectorFilter,

    draft,
    handleSearchChange,
    handleSearchSubmit,

    handleEstado,
    handleSector,

    clearFilters,
  };
}
