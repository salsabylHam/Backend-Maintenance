import { RolePermission } from 'src/role-permissions/entities/role-permission.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column()
  code: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @OneToMany(() => RolePermission, (rolePermissions) => rolePermissions.role, {
    lazy: true,
    cascade: true,
  })
  rolePermissions!: RolePermission[];
}
