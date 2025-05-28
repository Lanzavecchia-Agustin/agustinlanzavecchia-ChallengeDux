// app/users/containers/ServerTableContainer.tsx

import type { SearchParams } from '../types';
import ClientTableContainer from './ClientTableContainer';
import { usersService } from '../services/users.service';

export default async function UsersTableServer({
  searchParams = {},
}: {
  searchParams?: SearchParams;
}) {
  // 1) Construimos los parámetros de consulta a partir de los searchParams
  const params = {
    page: Number(searchParams.page ?? '1'),
    limit: 10,
    q: searchParams.q,
    estado: searchParams.estado,
    sector: searchParams.sector ? Number(searchParams.sector) : undefined,
  };

  // 2) Aquí es donde React "suspende" la renderización de este componente
  //    hasta que la promesa de listWithCount() se resuelva.
  //    Esa suspensión activa el Suspense boundary definido en la Page.
  const { items: users, total } = await usersService.listWithCount(params);

  // 3) Cuando la promesa se cumple, React continúa el renderizado
  //    reemplazando el fallback (skeleton) por este JSX:
  return <ClientTableContainer ssrUsers={users} ssrTotal={total} initialParams={params} />;
}
