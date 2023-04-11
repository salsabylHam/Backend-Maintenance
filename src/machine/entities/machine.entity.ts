import { Demande } from 'src/demande/entities/demande.entity';
import { MachinePice } from 'src/machine-pices/entities/machine-pice.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Machine {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToMany(() => Demande, (demande) => demande.machine)
  demandes: Demande[];
  @Column()
  description: string;
  @ManyToMany(() => MachinePice, (machinePice) => machinePice.machine)
  machinePice: MachinePice[];
}
