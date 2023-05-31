import { Demande } from 'src/demande/entities/demande.entity';
import { Machine } from 'src/machine/entities/machine.entity';
import { Piece } from 'src/piece/entities/piece.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column()
  path: string;

  @Column({ nullable: true })
  requestId: number;
  @Column({ nullable: true })
  machineId: number;
  @Column({ nullable: true })
  pieceId: number;
  @ManyToOne(() => Demande, (demande) => demande.files, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  request: Demande;
  @ManyToOne(() => Machine, (machine) => machine.files, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  machine: Machine;
  @ManyToOne(() => Piece, (piece) => piece.files, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  piece: Piece;
}
