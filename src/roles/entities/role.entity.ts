import { RolePermission } from 'src/role-permissions/entities/role-permission.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

Entity();
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column()
  code: string;

  @OneToMany(() => User, (user) => user.role)
  @JoinColumn({ name: 'userId' })
  user: User;
  @Column()
  userId: number;
  @OneToMany(() => RolePermission, (rolePermissions) => rolePermissions.role, {
    lazy: true,
  })
  rolePermissions!: RolePermission[];
}
