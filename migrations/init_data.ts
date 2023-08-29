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
  {
    label: 'Leave Requests',
    code: 'LEAVE_REQUESTS',
  },
  {
    label: 'Time Tracking	',
    code: 'TIMETRACKING',
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
];

export const users = [
  {
    email: 'admin@admin.com',
    password: '$2b$10$EPgV42OD1t4puYrhauhyKuPdwenwCAwFQyaFy1ROEqQNZxfMhDnKe',
    firstName: 'admin',
    lastName: 'admin',
    picture: null,
  },
  {
    email: 'Tom@tech.com',
    password: '$2b$10$lYEjg.rC6M6agHzDLZgiUOXyRE.z1.svo1YWqzPiZTYSx3SulzEI2',
    firstName: 'Tom',
    lastName: 'Edison',
    picture: null,
  },
  {
    email: 'Benjamen@tech.com',
    password: '$2b$10$EkzfOVKs4cniAROXOx0DS.Z7kvwz7wfB82Wn6MA7rbclV9VMm2WDO',
    firstName: 'Benjamen',
    lastName: 'franklin',
    picture: null,
  },
  {
    email: 'Manager@tech.com',
    password: '$2b$10$EPgV42OD1t4puYrhauhyKuPdwenwCAwFQyaFy1ROEqQNZxfMhDnKe',
    firstName: 'John',
    lastName: 'Doe',
    picture: null,
  },
];

export const damage_code = [
  {
    description: 'lorem impsum',
    code: 'A02',
    name: 'Electrical Object Part',
    g_code: 'damage_electrical',
  },
  {
    description: 'lorem impsum',
    code: 'P25',
    name: 'Open Circuit',
    g_code: 'damage_electrical',
  },
  {
    description: 'lorem impsum',
    code: 'A04',
    name: 'Hydraulic Object Part',
    g_code: 'damage_mechanical',
  },
  {
    description: 'lorem ipsum',
    code: 'P01',
    name: 'Abnormal condition',
    g_code: 'damage_electrical',
  },
  {
    description: 'lorem impsum',
    code: 'P08',
    name: 'Clogged',
    g_code: 'damage_mechanical',
  },
];

export const damage_group = [
  {
    description: 'lorem impsum',
    code: 'damage_mechanical',
    label: 'Mechanical damage',
  },
  {
    description: 'lorem impsum',
    code: 'damage_electrical',
    label: 'Electrical damage',
  },
];
