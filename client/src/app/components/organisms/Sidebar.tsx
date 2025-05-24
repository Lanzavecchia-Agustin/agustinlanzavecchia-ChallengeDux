'use client';

import React from 'react';

export const Sidebar: React.FC = () => (
  <aside
    className="flex align-items-start justify-content-center p-3 pt-5"
    style={{ backgroundColor: 'rgba(45, 62, 80, 1)' }}
  >
    <i className="pi pi-box text-surface-50 text-2xl text-white" aria-label="Sección principal" />
  </aside>
);
