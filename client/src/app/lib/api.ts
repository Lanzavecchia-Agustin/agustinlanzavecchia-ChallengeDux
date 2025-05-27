import { z } from 'zod';

const API_BASE =
  typeof window === 'undefined' ? process.env.API_BASE! : process.env.NEXT_PUBLIC_API_BASE!;
const DEFAULT_SECTOR = Number(process.env.NEXT_PUBLIC_SECTOR_ID!);

if (!API_BASE) throw new Error('❌ API_BASE not defined.');
if (!DEFAULT_SECTOR) throw new Error('❌ NEXT_PUBLIC_SECTOR_ID not defined.');

/** Solo para GET: añade ?sector=DEFAULT_SECTOR si no existe */
function buildGetUrl(path: string): URL {
  const url = new URL(`${API_BASE}${path}`);
  if (!url.searchParams.has('sector')) {
    url.searchParams.set('sector', String(DEFAULT_SECTOR));
  }
  return url;
}

/**
 * apiFetch genérico:
 * - GET → usa buildGetUrl (añade sector en query)
 * - POST/PATCH/DELETE → respeta payload.sector; inyecta DEFAULT_SECTOR solo si no viene
 */
export async function apiFetch<T>(
  path: string,
  options: RequestInit & { schema?: z.ZodType<T> } = {},
): Promise<T> {
  const method = (options.method ?? (options.body ? 'POST' : 'GET')).toUpperCase();
  const url = method === 'GET' ? buildGetUrl(path) : new URL(`${API_BASE}${path}`);

  let body = options.body as string | undefined;
  if (method !== 'GET') {
    const payload = body ? JSON.parse(body) : {};
    if (payload.sector == null) {
      payload.sector = DEFAULT_SECTOR;
    }
    body = JSON.stringify(payload);
  }

  const res = await fetch(url.toString(), {
    ...options,
    method,
    body,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`❌ API Error ${res.status}: ${errorText} (${url.pathname})`);
  }

  const data = (await res.json()) as T;
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
