import { Demande } from 'src/demande/entities/demande.entity';
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

  @ManyToOne(() => Demande, (demande) => demande.files, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  request: Demande;
}
