import { RolePermission } from 'src/role-permissions/entities/role-permission.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column()
  code: string;
  @ManyToOne(() => User, (user) => user.roles, { lazy: true, cascade: true })
  @JoinColumn({ name: 'idUser' })
  user: User;

  @Column({ nullable: true })
  idUser: number;

  @OneToMany(() => RolePermission, (rolePermissions) => rolePermissions.role, {
    lazy: true,
  })
  rolePermissions!: RolePermission[];
}
