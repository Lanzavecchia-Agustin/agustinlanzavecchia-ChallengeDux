import { usersService } from '../services/users.service';
import { UsersTableContainer } from '../components/UsersTableContainer';

export const UsersTableServer = async ({ page }: { page: number }) => {
  const users = await usersService.list({ page, limit: 10 });
  return <UsersTableContainer users={users} page={page} />;
};
