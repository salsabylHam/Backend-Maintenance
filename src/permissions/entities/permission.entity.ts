import { RolePermission } from 'src/role-permissions/entities/role-permission.entity';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column()
  code: string;

  @OneToMany(
    () => RolePermission,
    (rolePermission) => rolePermission.permission,
  )
  rolePermission!: RolePermission[];
}
