import { DamageCode } from 'src/damage-code/entities/damage-code.entity';
import { DamageGroup } from 'src/damage-group/entities/damage-group.entity';
import { Machine } from 'src/machine/entities/machine.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Demande {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  description: string;
  @Column()
  image: string;
  @Column()
  damageGroupId: number;
  @Column()
  damageCodeId: string;
  @ManyToOne(() => DamageCode, (damageCode) => damageCode.demandes)
  @JoinColumn({ name: 'damageCodeId' })
  damageCode: DamageCode;
  @ManyToOne(() => DamageGroup, (damageGroup) => damageGroup.demandes)
  @JoinColumn({ name: 'damageGroupId' })
  damageGroup: DamageGroup;
  @Column()
  typeOfInterventions: string;
  @Column()
  priority: string;
  @Column({ type: 'text' })
  note: string;
  @ManyToOne(() => User, (user) => user.demandes)
  createdBy: number;
  @Column()
  createdAt: Date;
  @Column()
  machineId: number;
  @ManyToOne(() => Machine, (machine) => machine.demandes)
  @JoinColumn({ name: 'machineId' })
  machine: Machine;
  @Column()
  updatedAt: Date;
}
