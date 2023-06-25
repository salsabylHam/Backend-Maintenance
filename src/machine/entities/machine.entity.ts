import { Demande } from 'src/demande/entities/demande.entity';
import { File } from 'src/files/entities/file.entity';
import { Piece } from 'src/piece/entities/piece.entity';
import {
  Column,
  Entity,
  JoinTable,
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

  @ManyToMany(() => Piece, {
    cascade: true,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinTable({
    name: 'machine_piece',
  })
  pieces: Piece[];

  @OneToMany(() => File, (file) => file.machine, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  files: File[];
}
