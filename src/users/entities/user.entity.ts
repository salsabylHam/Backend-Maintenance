import { Demande } from 'src/demande/entities/demande.entity';
import { OrderTechnician } from 'src/order_technicians/entities/order_technician.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
  @OneToMany(() => Demande, (demande) => demande.createdBy)
  demandes: Demande[];
  @OneToMany(
    () => OrderTechnician,
    (orderTechnician) => orderTechnician.technician,
  )
  orderTechnician: OrderTechnician;
}
