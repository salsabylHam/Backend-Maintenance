import { MachinePice } from 'src/machine-pices/entities/machine-pice.entity';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Piece {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToMany(() => MachinePice, (machinePice) => machinePice.piece)
  machinePice: MachinePice[];
}
