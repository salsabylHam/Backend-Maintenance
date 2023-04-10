import { MachinePice } from 'src/machine-pices/entities/machine-pice.entity';
import { Entity, OneToMany } from 'typeorm';
@Entity()
export class Piece {
  @OneToMany(() => MachinePice, (machinePice) => machinePice.piece)
  machinePice: MachinePice[];
}
