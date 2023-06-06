import { File } from 'src/files/entities/file.entity';
import { OrderTechnicianPieces } from 'src/order-technician-pieces/entities/order-technician-pieces.entity';
import { Order } from 'src/order/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class OrderTechnician {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ type: 'text', nullable: true })
  note: string;

  @ManyToOne(() => User, (user) => user.orderTechnician, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'userId' })
  technician: User;

  @Column({ nullable: true })
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @Column()
  orderId: number;

  @OneToMany(() => File, (file) => file.orderTechnician, {
    cascade: true,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  files: File[];

  @ManyToOne(() => Order, (order) => order.orderTechnician, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @OneToMany(
    () => OrderTechnicianPieces,
    (orderTechnicianPiece) => orderTechnicianPiece.orderTechnician,
    {
      onDelete: 'CASCADE',
      orphanedRowAction: 'delete',
    },
  )
  orderTechnicianPieces: OrderTechnicianPieces[];
}
