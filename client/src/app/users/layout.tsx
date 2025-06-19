// layout.tsx - VERSIÓN FINAL
import React from 'react';
import { Header } from '../components/organisms/Header';
import { Sidebar } from '../components/organisms/Sidebar';
import { UsersProvider } from '../modules/users/context/UsersContext';
import { UsersFormModal } from '../modules/users/components/UsersFormModal';

interface UsersLayoutProps {
  children: React.ReactNode;
}

export default function UsersLayout({ children }: UsersLayoutProps) {
  return (
    <UsersProvider>
      <div>
        <Header />
        <div className="flex w-full min-h-screen">
          <Sidebar />
          <main className="mx-4 w-full">{children}</main>
        </div>
      </div>

      {/* Modal global - se controla desde el contexto */}
      <UsersFormModal />
    </UsersProvider>
  );
}
