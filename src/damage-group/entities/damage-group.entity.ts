import { Demande } from 'src/demande/entities/demande.entity';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class DamageGroup {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToMany(() => Demande, (demande) => demande.damageGroup)
  demandes: Demande[];
}
