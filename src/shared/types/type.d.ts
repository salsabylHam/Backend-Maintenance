import { AppModules, Permission } from '../enums';

export type RolePermission = {
  module: AppModules;
  permissions: Permission[];
};
