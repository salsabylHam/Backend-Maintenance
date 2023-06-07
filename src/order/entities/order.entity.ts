import { Demande } from 'src/demande/entities/demande.entity';
import { Machine } from 'src/machine/entities/machine.entity';
import { OrderTechnician } from 'src/order_technicians/entities/order_technician.entity';
import { InterventionType } from 'src/shared/enums/intervention-types.enum';
import { OCCURRENCE } from 'src/shared/enums/occurrence.enum';
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
  endDate: string;

  @Column({ type: 'enum', enum: InterventionType })
  typeOfInterventions: string;

  @Column({ type: 'enum', enum: PRIORITY })
  priority: string;

  @Column({ type: 'enum', enum: OCCURRENCE, nullable: true })
  occurrence: string;

  @Column({ type: 'text' })
  note: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  machineId: number;

  @ManyToOne(() => Machine)
  @JoinColumn({ name: 'machineId' })
  machine: Machine;

  @ManyToOne(() => Demande)
  @JoinColumn({ name: 'demandeId' })
  demande: Demande;
}
