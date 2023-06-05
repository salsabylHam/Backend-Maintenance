import { File } from 'src/files/entities/file.entity';
import { Machine } from 'src/machine/entities/machine.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Piece {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  discription: string;

  @Column()
  code: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @ManyToMany(() => Machine, {
    cascade: true,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinTable({
    name: 'machine_piece',
  })
  machines: Machine[];

  @OneToMany(() => File, (file) => file.piece, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  files: File[];
}
