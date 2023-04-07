import { Demande } from 'src/demande/entities/demande.entity';
import { Entity, OneToMany } from 'typeorm';
@Entity()
export class DamageGroup {
  @OneToMany(() => Demande, (demande) => demande.damageGroup)
  demandes: Demande[];
}
