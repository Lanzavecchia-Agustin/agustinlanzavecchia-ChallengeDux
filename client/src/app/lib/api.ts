import { z } from 'zod';

// Definimos la base de la API según si estamos en el servidor o cliente
const API_BASE =
  typeof window === 'undefined'
    ? // En servidor (SSR) usamos process.env.API_BASE (secreto)
      process.env.API_BASE!
    : // En cliente (CSR) usamos NEXT_PUBLIC_API_BASE (expuesto)
      process.env.NEXT_PUBLIC_API_BASE!;

// Sector por defecto (ID) para filtrar todas las peticiones
const SECTOR = Number(process.env.NEXT_PUBLIC_SECTOR_ID!);

// Validaciones de entorno
if (!API_BASE) throw new Error('❌ API_BASE not defined.');
if (!SECTOR) throw new Error('❌ NEXT_PUBLIC_SECTOR_ID not defined.');

/**
 * buildGetUrl:
 * - Construye una URL absoluta para peticiones GET
 * - Si no se incluye `sector` en los query params, lo añade automáticamente
 */
function buildGetUrl(path: string): URL {
  const url = new URL(`${API_BASE}${path}`);
  if (!url.searchParams.has('sector')) {
    url.searchParams.set('sector', String(SECTOR));
  }
  return url;
}

/**
 * apiFetch genérico para llamadas a la API:
 * - GET: utiliza buildGetUrl para incluir `sector`
 * - POST/PATCH/DELETE: inyecta `sector` en el payload si no existe
 * - Validación Zod opcional para la respuesta
 */
export async function apiFetch<T>(
  path: string,
  options: RequestInit & { schema?: z.ZodType<T> } = {},
): Promise<T> {
  // Determinar método HTTP (por defecto GET o POST si hay body)
  const method = (options.method ?? (options.body ? 'POST' : 'GET')).toUpperCase();

  // Construir URL: GET usa buildGetUrl, otros usan API_BASE directo
  const url = method === 'GET' ? buildGetUrl(path) : new URL(`${API_BASE}${path}`);

  // Preparar body: si no es GET, insertar `sector` en el JSON
  let body = options.body as string | undefined;
  if (method !== 'GET') {
    const payload = body ? JSON.parse(body) : {};
    if (payload.sector == null) payload.sector = SECTOR;
    body = JSON.stringify(payload);
  }

  // Ejecutar fetch con headers JSON
  const res = await fetch(url.toString(), {
    ...options,
    method,
    body,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
  });

  // Si la respuesta no es OK, lanzar error con detalle
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`❌ API Error ${res.status}: ${errorText} (${url.pathname})`);
  }

  // Parsear cuerpo JSON a tipo genérico T
  const data = (await res.json()) as T;

  // Si se pasó un schema Zod, validar formato de respuesta
  if (options.schema) {
    try {
      options.schema.parse(data);
    } catch (e) {
      console.error('❌ Zod validation error:', e);
      throw new Error('Invalid response format.');
    }
  }

  return data;
}
