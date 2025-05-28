# Challenge Técnico - ABM de Usuarios

Este repositorio contiene la solución al **challenge técnico** de Dux Software para la creación, lectura, actualización y eliminación de usuarios (ABM) usando **Next.js 14**, **React 18**, **TypeScript** y **PrimeReact**.

---

## 🏁 Inicio rápido

1. Clona este repositorio:

   ```bash
   git clone https://github.com/tu-usuario/NombreCandidato-ChallengeDux.git
   cd NombreCandidato-ChallengeDux/client
   ```

2. Crea el archivo de variables de entorno basándote en `.env.example`:

   ```bash
   cp .env.example .env.local
   ```

   Luego edita `.env.local` y completa:

   ```dotenv
   API_BASE=https://staging.duxsoftware.com.ar/api-test
   NEXT_PUBLIC_API_BASE=https://staging.duxsoftware.com.ar/api-test
   NEXT_PUBLIC_SECTOR_ID=7000
   ```

3. Instala dependencias y ejecuta en modo desarrollo:

   ```bash
   npm install
   npm run dev
   # o yarn dev / pnpm dev / bun dev
   ```

4. Abre el navegador en [http://localhost:3000](http://localhost:3000).

---

## 📂 Estructura del proyecto

```plain
src/
├─ app/
│  ├─ layout.tsx                       # Layout global (Header, Sidebar, Toast, modal)
│  ├─ page.tsx                         # IntroPage
│  ├─ providers/
│  │  └─ query-client-provider.tsx    # React Query Provider
│  ├─ components/
│  │  ├─ atoms/                        # Botones, Inputs, Labels...
│  │  ├─ molecules/                    # SearchBar, FilterSelect...
│  │  └─ organisms/                    # Header, Sidebar, Pagination...
│  └─ lib/
│     └─ api.ts                        # apiFetch genérico con inyección de sector
│
├─ modules/users/
│  ├─ layout.tsx                       # Layout de /users (filtros, tabla, modal)
│  ├─ page.tsx                         # Server Component de Usuarios
│  ├─ actions/
│  │  └─ user.actions.ts               # Server Actions: create/update/delete + revalidateTag
│  ├─ components/
│  │  ├─ UsersFormModal.tsx            # Modal de creación/edición
│  │  ├─ UsersTable.tsx                # Tabla de usuarios con botón de delete
│  │  ├─ UserTableFilters.tsx          # Filtros responsive
│  │  └─ UsersTableSkeleton.tsx        # Skeleton loader
│  ├─ containers/
│  │  ├─ ServerTableContainer.tsx      # Carga SSR + renderiza cliente
│  │  └─ ClientTableContainer.tsx      # React Query + placeholderData
│  ├─ context/
│  │  └─ UserFormContext.ts            # Context para abrir modal desde la tabla
│  ├─ hooks/
│  │  ├─ useUrlFilters.ts             # Lógica de filtros + URL
│  │  ├─ useUsers.ts                   # Hooks React Query (useGet, useCreate, useUpdate, useDelete)
│  │  └─ useUserForm.ts                # Modal form state y mutaciones
│  ├─ services/
│  │  └─ users.service.ts              # Endpoints CSR + SSR (list + listWithCount)
│  ├─ constants.ts                     # UserStatus, opciones de filtro
│  └─ types.ts                         # Tipos: User, ListUsersParams, SearchParams

public/
├─ favicon.ico

package.json
```

## 🔧 Variables de entorno

En el repositorio encontrarás un archivo `\.env\.example` con el formato y las variables necesarias. **No incluyas valores reales ni secretos en tu commit**: cada colaborador debe crear su propio `.env.local` basándose en ese ejemplo.

```dotenv
# .env.local (ejemplo)
API_BASE=https://<TU_API_BASE>/api-test
NEXT_PUBLIC_API_BASE=https://<TU_API_BASE>/api-test
NEXT_PUBLIC_SECTOR_ID=<TU_SECTOR_ID>
```

Luego, reemplaza `<TU_API_BASE>` y `<TU_SECTOR_ID>` por los valores correspondientes que te haya proporcionado tu equipo.

\-----------------------|--------------------------------------------------|------------------------------------------------------|
\| `API_BASE`            | Base URL para fetch en Server Components (SSR)   | `https://staging.duxsoftware.com.ar/api-test`       |
\| `NEXT_PUBLIC_API_BASE`| Base URL para fetch en Client Components (CSR)   | `https://staging.duxsoftware.com.ar/api-test`       |
\| `NEXT_PUBLIC_SECTOR_ID`| Sector por defecto para todas las peticiones    | `7000`                                               |

> **Nota:** copia `.env.example` a `.env.local` antes de arrancar.

---

## 🚀 Características principales

* **Server Components** para cargar datos SSR (mejor SEO y performance).
* **React Query** con `placeholderData` para hidratación rápida en cliente.
* **`revalidateTag`** para invalidación granular de cache (lista vs detalle).
* **PrimeReact + PrimeFlex** para componentes UI y utilidades de estilos.
* **Atomic Design**: separación clara entre átomos, moléculas y organismos.
* **Hooks personalizados**:

  * `useUrlFilters`: sincroniza filtros con URL y debounce de búsqueda.
  * `useUserForm`: gestiona modal de create/update con validaciones.
  * `useUsers`: centraliza query keys y mutaciones para CRUD.
* **Feedback de UX**: skeleton loaders, toasts, confirm dialogs.

---

## 📐 Enfoque técnico

1. **SSR vs CSR**:

   * La lista inicial de usuarios se obtiene en el server y se renderiza con `<Suspense>` + skeleton.
   * Luego, React Query revalida y actualiza en el cliente.

2. **Cache e invalidación**:

   * React Query gestiona stale time y cache time global.
   * `revalidateTag` de Next.js actualiza solo los componentes marcados con la tag correspondiente.

3. **Filtros y paginación**:

   * Se leen de la URL (`page`, `q`, `estado`, `sector`).
   * Hook `useUrlFilters` actualiza la URL sin recargar (router.replace + refresh).

4. **Entorno y configuración**:

   * Inyección automática de `sector` en todas las peticiones via `apiFetch`.
   * Variables públicas prefijadas con `NEXT_PUBLIC_` para uso en cliente.

---

## 📖 Recursos

* **Next.js**: [https://nextjs.org/docs](https://nextjs.org/docs)
* **React Query**: [https://tanstack.com/query/latest](https://tanstack.com/query/latest)
* **PrimeReact**: [https://www.primefaces.org/primereact](https://www.primefaces.org/primereact)
* **PrimeFlex**: [https://primeflex.org/](https://primeflex.org/)
* **json-server** (API de prueba): [https://github.com/typicode/json-server](https://github.com/typicode/json-server)

---

**¡Gracias por revisar mi solución!** Cualquier duda, feedback o mejora será bienvenida.

---

