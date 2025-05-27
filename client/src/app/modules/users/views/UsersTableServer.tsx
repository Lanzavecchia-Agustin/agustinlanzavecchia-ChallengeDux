import { usersService } from '../services/users.service';
import { UsersTableContainer } from '../components/UsersTableContainer';
import { UserStatus } from '../constants';
import { SearchParams } from '../types';

interface Params {
  searchParams: SearchParams;
}
export const UsersTableServer = async ({ searchParams }: Params) => {
  const { page = '1', q, estado, sector } = searchParams;

  const users = await usersService.list({
    page: Number(page),
    limit: 10,
    q,
    estado: estado as UserStatus | undefined,
    sector: sector ? Number(sector) : undefined,
  });

  return <UsersTableContainer users={users} />;
};
