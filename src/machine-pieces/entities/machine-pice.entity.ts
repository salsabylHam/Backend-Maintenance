import { Machine } from 'src/machine/entities/machine.entity';
import { Piece } from 'src/piece/entities/piece.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MachinePiece {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Piece, (piece) => piece.machinePiece)
  piece: Piece;

  @ManyToOne(() => Machine, (machine) => machine.machinePiece)
  machine: Machine;
}
