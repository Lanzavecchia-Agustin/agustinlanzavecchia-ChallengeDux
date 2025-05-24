'use client';

import React from 'react';
import logo from '@/public/logo.png';
import Image from 'next/image';
import { Button } from '../atoms/Button';

export const Header: React.FC = () => (
  <header
    className="text-primary-color-text py-1 px-2 flex justify-content-between align-items-center"
    style={{ backgroundColor: 'rgba(7, 99, 231, 1)' }}
  >
    <Image src={logo} alt="Logo Libro Diario" width={40} height={40} />

    <Button
      icon="pi pi-cog"
      disabled
      className="p-button-rounded p-button-text p-button-icon-only"
      aria-label="Configuración"
    />
  </header>
);
