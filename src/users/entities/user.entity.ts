import { Demande } from 'src/demande/entities/demande.entity';
import { Team } from 'src/team/entities/team.entity';
import { OrderTechnician } from 'src/order_technicians/entities/order_technician.entity';
import { Role } from 'src/roles/entities/role.entity';
import { UserNotification } from 'src/user-notifications/entities/user-notification.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ select: false, default: '' })
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  phone2: string;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @Column({ nullable: true })
  roleId: number;

  @OneToMany(() => Demande, (demande) => demande.createdBy)
  demandes: Demande[];

  @OneToMany(
    () => OrderTechnician,
    (orderTechnician) => orderTechnician.technician,
  )
  orderTechnician: OrderTechnician[];

  @OneToMany(
    () => UserNotification,
    (userNotification) => userNotification.user,
  )
  userNotification: UserNotification;

  @ManyToMany(() => Team, {
    cascade: true,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinTable({
    name: 'user_team',
  })
  teams: Team[];
}
