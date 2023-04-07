import { Demande } from 'src/demande/entities/demande.entity';
import { Entity, OneToMany } from 'typeorm';

@Entity()
export class User {
  @OneToMany(() => Demande, (demande) => demande.createdBy)
  demandes: Demande[];
}
