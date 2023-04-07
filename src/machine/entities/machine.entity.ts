import { Demande } from 'src/demande/entities/demande.entity';
import { Entity, OneToMany } from 'typeorm';

@Entity()
export class Machine {
  @OneToMany(() => Demande, (demande) => demande.machine)
  demandes: Demande[];
}
