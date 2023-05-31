import { Demande } from 'src/demande/entities/demande.entity';
import { File } from 'src/files/entities/file.entity';
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
  @Column()
  name: string;
  @Column()
  description: string;
  @OneToMany(() => Demande, (demande) => demande.machine)
  demandes: Demande[];
  @OneToMany(() => MachinePiece, (machinePiece) => machinePiece.machine)
  machinePiece: MachinePiece[];
  @OneToMany(() => File, (file) => file.machine, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  files: File[];
}
