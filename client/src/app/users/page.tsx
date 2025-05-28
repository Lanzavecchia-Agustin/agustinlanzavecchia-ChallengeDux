import { Suspense } from 'react';

import type { SearchParams } from '../modules/users/types';
import { UserTableSkeleton } from '../modules/users/components/UsersTableSkeleton';
import ServerTableContainer from '../modules/users/containers/ServerTableContainer';

export default function Page({ searchParams = {} }: { searchParams?: SearchParams }) {
  return (
    // -------------------------------
    // 1) Suspense boundary aquí
    // -------------------------------
    // Al envolver ServerTableContainer en <Suspense>, indicamos a React
    // que muestre inmediatamente el fallback (UserTableSkeleton) mientras
    // el componente hijo aún está cargando datos en el servidor.
    //
    // 2) ¿Por qué es necesario?
    // - Page no es async, por lo que puede enviar el HTML al cliente sin
    //   esperar al fetch.
    // - ServerTableContainer es un Async Server Component que hace `await`
    //   sobre usersService.listWithCount().
    // - Al suspenderse ese await, React interrumpe el render y pinta el
    //   skeleton, mejorando la UX con un loader específico.
    //
    // 3) ¿Qué sucede después?
    // - Cuando ServerTableContainer termina de resolver la promesa,
    //   React reemplaza el skeleton por la tabla real dentro del mismo
    //   lugar en el flujo de renderizado.

    <Suspense fallback={<UserTableSkeleton />}>
      <ServerTableContainer searchParams={searchParams} />
    </Suspense>
  );
}
