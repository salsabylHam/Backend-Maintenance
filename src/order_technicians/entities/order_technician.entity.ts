import { Order } from 'src/order/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class OrderTechnician {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId: number;
  @ManyToOne(() => User, (user) => user.orderTechnician)
  @JoinColumn({ name: 'userId' })
  technician: User;
  @Column()
  startDate: Date;
  @Column()
  deadLigne: Date;
  @Column()
  orderId: number;
  @ManyToOne(() => Order, (order) => order.orderTechnician)
  @JoinColumn({ name: 'orderId' })
  order: Order;
}
