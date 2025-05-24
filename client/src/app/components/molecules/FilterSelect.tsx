'use client';

import React from 'react';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';

export interface FilterOption<T> {
  label: string;
  value: T;
}

interface FilterSelectProps<T> {
  options: FilterOption<T>[];
  value?: T;
  onChange: (value: T) => void;
  placeholder?: string;
}

export function FilterSelect<T>({
  options,
  value,
  onChange,
  placeholder = 'Seleccionar...',
}: FilterSelectProps<T>) {
  return (
    <Dropdown
      options={options}
      value={value}
      onChange={(e: DropdownChangeEvent) => {
        onChange(e.value as T);
      }}
      placeholder={placeholder}
      className="w-full"
    />
  );
}
