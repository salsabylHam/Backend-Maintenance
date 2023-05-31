import { File } from 'src/files/entities/file.entity';
import { MachinePiece } from 'src/machine-pieces/entities/machine-pice.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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
  @OneToMany(() => MachinePiece, (machinePiece) => machinePiece.piece)
  machinePiece: MachinePiece[];
  @OneToMany(() => File, (file) => file.piece, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  files: File[];
}
