import { Demande } from 'src/demande/entities/demande.entity';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DamageCode {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToMany(() => Demande, (demande) => demande.damageCode)
  demandes: Demande[];
}
