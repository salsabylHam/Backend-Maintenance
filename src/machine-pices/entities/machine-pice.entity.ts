import { Machine } from 'src/machine/entities/machine.entity';
import { Piece } from 'src/piece/entities/piece.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MachinePice {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Piece, (piece) => piece.machinePice)
  piece: Piece;

  @ManyToOne(() => Machine, (machine) => machine.machinePice)
  machine: Machine;
}
