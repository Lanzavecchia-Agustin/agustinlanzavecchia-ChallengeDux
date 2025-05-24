// src/components/organisms/Sidebar.tsx
'use client';

import React from 'react';

export const Sidebar: React.FC = () => (
  <aside
    className="text-surface-0 p-3 pt-5 flex items-center justify-center"
    style={{ backgroundColor: 'rgba(45, 62, 80, 1)' }}
  >
    <i className="pi pi-box text-surface-50 text-2xl text-white" aria-label="Sección principal" />
  </aside>
);
