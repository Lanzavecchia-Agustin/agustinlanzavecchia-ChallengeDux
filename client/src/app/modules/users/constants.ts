import type { FilterOption } from '@/app/components/molecules/FilterSelect';

export const DEFAULT_SECTOR = Number(process.env.NEXT_PUBLIC_SECTOR_ID);

export enum UserStatus {
  ACTIVO = 'ACTIVO',
  INACTIVO = 'INACTIVO',
}

export const STATUS_OPTIONS: FilterOption<UserStatus>[] = [
  { label: 'Activo', value: UserStatus.ACTIVO },
  { label: 'Inactivo', value: UserStatus.INACTIVO },
];

// (Si en otro lugar sigues usando SECTOR_OPTIONS, puedes mantenerlo aquí,
// pero no es necesario para el modal de creación/edición)
export const SECTOR_OPTIONS: FilterOption<number>[] = [
  { label: 'Sector 1000', value: 1000 },
  { label: 'Sector 2000', value: 2000 },
  { label: 'Sector 3000', value: 3000 },
  { label: 'Sector 4000', value: 4000 },
  { label: 'Sector 5000', value: 5000 },
  { label: 'Sector 6000', value: 6000 },
  { label: 'Sector 7000', value: 7000 },
  { label: 'Sector 8000', value: 8000 },
  { label: 'Sector 9000', value: 9000 },
];
