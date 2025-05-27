// lib/api.ts
import { z } from 'zod';

const API_BASE =
  typeof window === 'undefined'
    ? process.env.API_BASE // Servidor (SSR)
    : process.env.NEXT_PUBLIC_API_BASE; // Cliente (CSR)

const SECTOR = process.env.NEXT_PUBLIC_SECTOR_ID;

/**
 * Construye la URL completa con sector incluido.
 */
function buildUrl(path: string): URL {
  if (!API_BASE) throw new Error('❌ API_BASE no está definido en las variables de entorno.');
  if (!SECTOR) throw new Error('❌ NEXT_PUBLIC_SECTOR_ID no está definido.');

  const url = new URL(`${API_BASE}${path}`);
  url.searchParams.set('sector', SECTOR);
  return url;
}

/**
 * Fetch genérico para API con soporte para:
 * - Tipado de respuesta genérico <T>
 * - Validación opcional con Zod
 * - Uso tanto desde SSR como CSR
 */
export async function apiFetch<T>(
  path: string,
  options?: RequestInit & {
    /**
     * Opciones específicas de Next.js (SSR caching)
     */
    next?: NextFetchRequestConfig;

    /**
     * Esquema Zod opcional para validar respuesta
     */
    schema?: z.ZodType<T>;
  },
): Promise<T> {
  const url = buildUrl(path);

  const res = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
    ...options,
    method: options?.body && !options?.method ? 'POST' : options?.method,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`❌ API Error ${res.status}: ${errorText} (${url.pathname})`);
  }

  const data = (await res.json()) as T;

  // Validación opcional con Zod
  if (options?.schema) {
    try {
      options.schema.parse(data);
    } catch (e) {
      console.error('❌ Error de validación con Zod:', e);
      throw new Error('Respuesta inválida según el esquema definido.');
    }
  }

  // Log opcional en desarrollo
  if (process.env.NODE_ENV === 'development') {
    console.log(`[apiFetch] ✅ ${res.status} ${url.pathname}`);
  }

  return data;
}
