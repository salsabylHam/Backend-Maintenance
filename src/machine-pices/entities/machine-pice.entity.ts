import { Machine } from 'src/machine/entities/machine.entity';
import { Piece } from 'src/piece/entities/piece.entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity()
export class MachinePice {
  @ManyToOne(() => Piece, (piece) => piece.machinePice)
  piece: Piece;

  @ManyToOne(() => Machine, (machine) => machine.machinePice)
  machine: Machine;
}
