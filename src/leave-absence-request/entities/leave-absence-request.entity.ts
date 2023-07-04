import { EVENT_TYPE } from 'src/shared/enums/event-type.enums';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LeaveAbsenceRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: EVENT_TYPE })
  type: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column()
  description: string;

  @Column()
  technicianId: number;

  @ManyToOne(() => User)
  technician: User;
}
