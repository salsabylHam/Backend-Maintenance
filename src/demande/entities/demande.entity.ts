import { DamageCode } from 'src/damage-code/entities/damage-code.entity';
import { DamageGroup } from 'src/damage-group/entities/damage-group.entity';
import { Machine } from 'src/machine/entities/machine.entity';
import { PRIORITY } from 'src/shared/enums/priority.enums';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Demande {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ nullable: true })
  image: string;

  @Column()
  damageCodeId: number;

  @ManyToOne(() => DamageCode, (damageCode) => damageCode.demandes)
  @JoinColumn({ name: 'damageCodeId' })
  damageCode: DamageCode;

  @Column()
  typeOfInterventions: string;

  @Column({ type: 'enum', enum: PRIORITY })
  priority: string;

  @Column({ type: 'text' })
  note: string;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.demandes)
  @JoinColumn({ name: 'userId' })
  createdBy: User;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @Column()
  machineId: number;

  @ManyToOne(() => Machine, (machine) => machine.demandes)
  @JoinColumn({ name: 'machineId' })
  machine: Machine;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
