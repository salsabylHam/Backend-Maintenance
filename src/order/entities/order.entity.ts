import { Contract } from 'src/contract/entities/contract.entity';
import { Demande } from 'src/demande/entities/demande.entity';
import { Enterprise } from 'src/enterprise/entities/enterprise.entity';
import { Machine } from 'src/machine/entities/machine.entity';
import { OrderTechnician } from 'src/order_technicians/entities/order_technician.entity';
import { RequestPart } from 'src/request-parts/entities/request-part.entity';
import { InterventionType } from 'src/shared/enums/intervention-types.enum';
import { OCCURRENCE } from 'src/shared/enums/occurrence.enum';
import { PRIORITY } from 'src/shared/enums/priority.enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    () => OrderTechnician,
    (orderTechnician) => orderTechnician.order,
    { cascade: true, orphanedRowAction: 'delete' },
  )
  orderTechnician: OrderTechnician[];

  @Column({ nullable: true })
  demandeId: number;

  @Column()
  startDate: string;

  @Column({ nullable: true })
  chainCode: string;

  @Column({ nullable: true })
  chainIndex: number;

  @Column({ nullable: true })
  endDate: string;

  @Column({ nullable: true })
  createOrderBefore: number;

  @Column({ nullable: true })
  orderId: number;

  @Column({ type: 'enum', enum: InterventionType })
  typeOfInterventions: string;

  @Column({ type: 'enum', enum: PRIORITY })
  priority: string;

  @Column({ type: 'enum', enum: OCCURRENCE, default: 'Once' })
  occurrence: string;

  @Column({ type: 'text' })
  note: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true })
  machineId: number;

  @Column({ nullable: true })
  duration: number;

  @Column({ nullable: true })
  contractId: number;

  @ManyToOne(() => Contract, (contract) => contract.orders)
  @JoinColumn({ name: 'contractId' })
  contract: Contract;

  @ManyToOne(() => Machine)
  @JoinColumn({ name: 'machineId' })
  machine: Machine;

  @ManyToOne(() => Demande)
  @JoinColumn({ name: 'demandeId' })
  demande: Demande;

  @OneToMany(() => RequestPart, (requestPart) => requestPart.order)
  requestedParts: RequestPart[];

  @OneToMany(() => Order, (order) => order.parentOrder, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  subOrders: Order[];

  @ManyToOne(() => Order, (order) => order.subOrders, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'orderId' })
  parentOrder: Order;

  @ManyToOne(() => Enterprise, (enterprise) => enterprise.orders)
  enterprise: Enterprise;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
