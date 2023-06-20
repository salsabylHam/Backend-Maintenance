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
  {
    label: 'Orders',
    code: 'ORDERS',
  },
  {
    label: 'Pieces',
    code: 'PIECES',
  },
];

export const roles = [
  { label: 'Administrator', code: 'ADMIN_ROLE' },
  { label: 'Technician', code: 'TECHNICIANS_ROLE' },
  { label: 'Manager', code: 'MANAGER_ROLE' },
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
    read: false,
  },
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
    read: false,
  },
  {
    update: false,
    delete: false,
    create: false,
    read: false,
  },
  {
    update: true,
    delete: true,
    create: true,
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
    read: false,
  },
];

export const managerRolePermissions = [
  {
    update: false,
    delete: false,
    create: false,
    read: false,
  },
  {
    update: true,
    delete: true,
    create: true,
    read: true,
  },
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
    read: false,
  },
  {
    update: false,
    delete: false,
    create: false,
    read: false,
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

export const users = [
  {
    email: 'admin@admin.com',
    password: '$2b$10$EPgV42OD1t4puYrhauhyKuPdwenwCAwFQyaFy1ROEqQNZxfMhDnKe',
    firstName: 'admin',
    lastName: 'admin',
  },
  {
    email: 'Tom@tech.com',
    password: '$2b$10$lYEjg.rC6M6agHzDLZgiUOXyRE.z1.svo1YWqzPiZTYSx3SulzEI2',
    firstName: 'Tom',
    lastName: 'Edison',
  },
  {
    email: 'Benjamen@tech.com',
    password: '$2b$10$EkzfOVKs4cniAROXOx0DS.Z7kvwz7wfB82Wn6MA7rbclV9VMm2WDO',
    firstName: 'Benjamen',
    lastName: 'franklin',
  },
  {
    email: 'Manager@tech.com',
    password: '$2b$10$EPgV42OD1t4puYrhauhyKuPdwenwCAwFQyaFy1ROEqQNZxfMhDnKe',
    firstName: 'John',
    lastName: 'Doe',
  },
];
