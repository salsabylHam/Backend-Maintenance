import { Demande } from 'src/demande/entities/demande.entity';
import { Entity, OneToMany } from 'typeorm';

@Entity()
export class DamageCode {
  @OneToMany(() => Demande, (demande) => demande.damageCode)
  demandes: Demande[];
}
