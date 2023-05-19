import { Demande } from 'src/demande/entities/demande.entity';
import { Machine } from 'src/machine/entities/machine.entity';
import { OrderTechnician } from 'src/order_technicians/entities/order_technician.entity';
import { InterventionType } from 'src/shared/enums/intervention-types.enum';
import { PRIORITY } from 'src/shared/enums/priority.enums';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => OrderTechnician, (orderTechnician) => orderTechnician.order)
  orderTechnician: OrderTechnician;

  @Column({ nullable: true })
  demandeId: number;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column({ type: 'enum', enum: InterventionType })
  typeOfInterventions: string;

  @Column({ type: 'enum', enum: PRIORITY })
  priority: string;

  @Column({ type: 'text' })
  note: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  machineId: number;

  @ManyToOne(() => Machine)
  @JoinColumn({ name: 'machineId' })
  machine: Machine;

  @OneToOne(() => Demande)
  @JoinColumn({ name: 'demandeId' })
  demande: Demande;
}
