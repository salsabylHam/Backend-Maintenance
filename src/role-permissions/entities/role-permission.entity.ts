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
  idRole!: number;

  @Column()
  idPermission!: number;

  @Column()
  read!: boolean;

  @Column()
  create!: boolean;

  @Column()
  update!: boolean;

  @Column()
  delete!: boolean;

  @ManyToOne(() => Role, null, { lazy: true, cascade: true })
  @JoinColumn({ name: 'idRole' })
  role: Role;

  @ManyToOne(() => Permission, null, { lazy: true, cascade: true })
  @JoinColumn({ name: 'idPermission' })
  permission: Permission;
}
