import { Demande } from 'src/demande/entities/demande.entity';
import { OrderTechnician } from 'src/order_technicians/entities/order_technician.entity';
import { Role } from 'src/roles/entities/role.entity';
import { UserNotification } from 'src/user-notifications/entities/user-notification.entity';
import {
  Column,
  Entity,
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
  @Column()
  password: string;
  @Column()
  phone: string;
  @ManyToOne(() => Role, (role) => role.user)
  role: Role;
  @OneToMany(() => Demande, (demande) => demande.createdBy)
  demandes: Demande[];
  @OneToMany(
    () => OrderTechnician,
    (orderTechnician) => orderTechnician.technician,
  )
  orderTechnician: OrderTechnician;
  @OneToMany(
    () => UserNotification,
    (userNotification) => userNotification.user,
  )
  userNotification: UserNotification;
}
