import { Demande } from 'src/demande/entities/demande.entity';
import { MachinePiece } from 'src/machine-pieces/entities/machine-pice.entity';
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
  @ManyToMany(() => MachinePiece, (machinePiece) => machinePiece.machine)
  machinePiece: MachinePiece[];
}
