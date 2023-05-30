import { MigrationInterface, QueryRunner } from 'typeorm';
import {
  adminRolePermissions,
  permissions,
  roles,
  technichanRolePermissions,
  users,
} from './init_data';
import { Permission } from 'src/permissions/entities/permission.entity';
import * as _ from 'lodash';
export class InitRolesAndUsers1685372967482 implements MigrationInterface {
  name = 'InitRolesAndUsers1685372967482';
  getInsertQuerry(tableName, data) {
    return `INSERT INTO ${tableName} ( ${Object.keys(data[0])
      .map((val) => `\`${val}\``)
      .join(', ')} ) VALUES ${data
      .map(
        (_) =>
          `( ${Object.keys(data[0])
            .map((_) => '? ')
            .join(', ')} )`,
      )
      .join(', ')}`;
  }
  getInsertValeus(data) {
    const values: any[] = [];
    for (const row of data) {
      for (const key of Object.keys(row)) values.push(row[key]);
    }
    return values;
  }
  setDefault(queryRunner: QueryRunner, tableName, data) {
    const [insertQuery, insertValues] = [
      this.getInsertQuerry(tableName, data),
      this.getInsertValeus(data),
    ];
    return queryRunner.query(insertQuery, insertValues);
  }
  public async up(queryRunner: QueryRunner): Promise<void> {
    // const permissionRepository =
    //   queryRunner.connection.getRepository(Permission);
    //   permissionRepository.save();
    await this.setDefault(queryRunner, 'permission', permissions);
    await this.setDefault(queryRunner, 'role', roles);
    const adminRole = (
      await queryRunner.query('select * from role where code = ?', [
        roles[0].code,
      ])
    ).pop();
    const technichanRole = (
      await queryRunner.query('select * from role where code = ?', [
        roles[1].code,
      ])
    ).pop();
    const permissionsData = await queryRunner.query('select * from permission');
    const patchedAdminRolePermission = _.map(
      adminRolePermissions,
      (rolePermissions, index) =>
        _.assign({}, rolePermissions, {
          permissionId: permissionsData[index].id,
          roleId: adminRole.id,
        }),
    );
    await this.setDefault(
      queryRunner,
      'role_permission',
      patchedAdminRolePermission,
    );
    const patchedTechnichanRolePermission = _.map(
      technichanRolePermissions,
      (rolePermissions, index) =>
        _.assign({}, rolePermissions, {
          permissionId: permissionsData[index].id,
          roleId: technichanRole.id,
        }),
    );
    await this.setDefault(
      queryRunner,
      'role_permission',
      patchedTechnichanRolePermission,
    );
    const patchedUsers = _.map(users, (user, index) =>
      _.assign({}, user, {
        roleId: index == 0 ? adminRole.id : technichanRole.id,
      }),
    );
    await this.setDefault(queryRunner, 'user', patchedUsers);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM USER WHERE email in ( ${users
        .map((_) => '?')
        .join(', ')} ) `,
      users.map((user) => user.email),
    );
    await queryRunner.query(
      `DELETE FROM Role WHERE code in ( ${roles.map((_) => '?').join(', ')} ) `,
      roles.map((role) => role.code),
    );
    await queryRunner.query(
      `DELETE FROM Permission WHERE code in ( ${permissions
        .map((_) => '?')
        .join(', ')} ) `,
      permissions.map((permission) => permission.code),
    );
  }
}
