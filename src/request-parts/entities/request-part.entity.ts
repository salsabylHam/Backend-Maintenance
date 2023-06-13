import { Order } from 'src/order/entities/order.entity';
import { PRIORITY } from 'src/shared/enums/priority.enums';
import { REQUEST_PARTS_STATUS } from 'src/shared/enums/request-parts-status.enum';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class RequestPart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: PRIORITY })
  urgencyLevel: string;

  @Column({ type: 'enum', enum: REQUEST_PARTS_STATUS, default: 'Waiting' })
  status: string;

  @Column()
  orderId: number;

  @Column()
  userId: number;

  @Column()
  qty: number;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Order, (order) => order.requestedParts, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'userId' })
  user: User;
}
