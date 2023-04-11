import { Demande } from 'src/demande/entities/demande.entity';
import { OrderTechnician } from 'src/order_technicians/entities/order_technician.entity';
import {
  Column,
  Entity,
  JoinColumn,
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
  @Column()
  demandeId: number;
  @OneToOne(() => Demande)
  @JoinColumn({ name: 'demandeId' })
  demande: Demande;
}
