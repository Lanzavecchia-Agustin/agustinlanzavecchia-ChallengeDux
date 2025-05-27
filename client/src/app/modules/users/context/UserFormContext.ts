import { useContext, createContext } from 'react';
import type { User } from '../types';

export const UserFormContext = createContext<{
  openEdit: (user: User) => void;
} | null>(null);

export const useUserFormContext = () => {
  const ctx = useContext(UserFormContext);
  if (!ctx) throw new Error('useUserFormContext must be used within provider');
  return ctx;
};
