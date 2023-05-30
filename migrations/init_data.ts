export const permissions = [
  {
    label: 'User',
    code: 'USER',
  },
  {
    label: 'Team',
    code: 'TEAM',
  },
  {
    label: 'Machine',
    code: 'MACHINE',
  },
  {
    label: 'damage-code',
    code: 'DAMAGE_CODE',
  },
  {
    label: 'Damage-group',
    code: 'DAMAGE_GROUP',
  },
  {
    label: 'Requests',
    code: 'REQUESTS',
  },
];
export const roles = [
  { label: 'admin role', code: 'ADMIN_ROLE' },
  { label: 'technichan role', code: 'TECHNICHANS_ROLE' },
];
export const adminRolePermissions = [
  {
    update: true,
    delete: true,
    create: true,
    read: true,
  },
  {
    update: true,
    delete: true,
    create: true,
    read: true,
  },
  {
    update: true,
    delete: true,
    create: true,
    read: true,
  },
  {
    update: true,
    delete: true,
    create: true,
    read: true,
  },
  {
    update: true,
    delete: true,
    create: true,
    read: true,
  },
  {
    update: true,
    delete: true,
    create: true,
    read: true,
  },
];
export const technichanRolePermissions = [
  {
    update: false,
    delete: false,
    create: false,
    read: false,
  },
  {
    update: false,
    delete: false,
    create: false,
    read: true,
  },
  {
    update: false,
    delete: false,
    create: false,
    read: true,
  },
  {
    update: false,
    delete: false,
    create: false,
    read: true,
  },
  {
    update: false,
    delete: false,
    create: false,
    read: true,
  },
  {
    update: false,
    delete: false,
    create: false,
    read: true,
  },
];
export const users = [
  {
    email: 'admin@admin.com',
    password: '$2y$10$s2Z4EYY0eAUhBsaohKFrdeVm6wjnONqJtudEEdDAy5A9HE6aVeSjq',
    firstName: 'admin',
    lastName: 'admin',
  },
  {
    email: 'Tom@tech.com',
    password: '$2y$10$gpaxpeiHyEe2mvDMoL8Bcenz4wuyimmIJ.9refZff0RUU5sHYenUe',
    firstName: 'Tom',
    lastName: 'Edison',
  },
  {
    email: 'Benjamen@tech.com',
    password: '$2y$10$hU6QD.SL0h6bMraSTMWNUeMrKoHs0BgMYT8jXNW8DCziuPw4CoIza',
    firstName: 'Benjamen',
    lastName: 'franklin',
  },
];
