import { Machine } from 'src/machine/entities/machine.entity';
import { Piece } from 'src/piece/entities/piece.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MachinePiece {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Piece, (piece) => piece.machinePiece)
  @JoinColumn({ name: 'pieceId' })
  piece: Piece;

  @ManyToOne(() => Machine, (machine) => machine.machinePiece)
  @JoinColumn({ name: 'machineId' })
  machine: Machine;
}
