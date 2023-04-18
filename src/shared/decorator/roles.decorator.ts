import { SetMetadata } from '@nestjs/common';
import { REQUIRED_MODULES_PERMISSIONS } from 'src/shared/constants';
import { RolePermission } from '../types/type';

/**
 * To use this decorator simply add the anotation
 *  @Roles(
    ...[
      {
        module: AppModules.Posts,
        permissions: [Permission.CREATE, Permission.DELETE],
      },
    ],
  )
 * @param roles containes list of the roles name with it's corresponding permissions
 * @returns
 */
export const Roles = (...roles: RolePermission[]) =>
  SetMetadata(REQUIRED_MODULES_PERMISSIONS, roles);
