import { Demande } from 'src/demande/entities/demande.entity';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToMany(() => Demande, (demande) => demande.createdBy)
  demandes: Demande[];
}
