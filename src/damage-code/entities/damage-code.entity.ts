import { Demande } from 'src/demande/entities/demande.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DamageCode {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  description: string;
  @Column()
  code: string;
  @Column()
  name: string;
  @OneToMany(() => Demande, (demande) => demande.damageCode)
  demandes: Demande[];
}
