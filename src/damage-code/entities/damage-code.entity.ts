import { DamageGroup } from 'src/damage-group/entities/damage-group.entity';
import { Demande } from 'src/demande/entities/demande.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  @Column()
  damageGroupId: number;
  @ManyToOne(() => DamageGroup, (damageGroup) => damageGroup.damageCode)
  @JoinColumn({ name: 'damageGroupId' })
  damageGroup: DamageGroup;
  @OneToMany(() => Demande, (demande) => demande.damageCode)
  demandes: Demande[];
}
