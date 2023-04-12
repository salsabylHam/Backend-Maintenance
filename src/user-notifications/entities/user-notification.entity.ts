import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class UserNotification {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'boolean', default: false })
  vue: boolean;
  @Column()
  userId: number;
  @Column()
  notificationId: number;
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
  @ManyToOne(() => Notification)
  @JoinColumn({ name: 'notificationId' })
  notification: Notification;
}
