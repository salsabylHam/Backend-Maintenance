import { Permission } from 'src/permissions/entities/permission.entity';
import { Role } from 'src/roles/entities/role.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class RolePermission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roleId!: number;

  @Column()
  permissionId!: number;

  @Column()
  read!: boolean;

  @Column()
  create!: boolean;

  @Column()
  update!: boolean;

  @Column()
  delete!: boolean;

  @ManyToOne(() => Role, (role) => role.rolePermissions, {
    lazy: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @ManyToOne(() => Permission, (permission) => permission.rolePermissions, {
    lazy: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'permissionId' })
  permission: Permission;
}
