import { Client } from 'src/client/entities/client.entity';
import { Enterprise } from 'src/enterprise/entities/enterprise.entity';
import { File } from 'src/files/entities/file.entity';
import { Order } from 'src/order/entities/order.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  scope: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column({ type: 'text' })
  payment: string;

  @Column({ type: 'text' })
  termination_clause: string;

  @Column()
  clientId: number;

  @ManyToOne(() => Client, (client) => client.contracts)
  @JoinColumn({ name: 'clientId' })
  client: Client;

  @OneToMany(() => Order, (order) => order.contract)
  orders: Order[];

  @OneToMany(() => File, (file) => file.contract, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  files: File[];

  @ManyToOne(() => Enterprise, (enterprise) => enterprise.contracts)
  enterprise: Enterprise
}
