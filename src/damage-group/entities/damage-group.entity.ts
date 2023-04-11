import { Demande } from 'src/demande/entities/demande.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class DamageGroup {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  description: string;
  @Column()
  code: string;
  @Column()
  label: string;
  @OneToMany(() => Demande, (demande) => demande.damageGroup)
  demandes: Demande[];
}
