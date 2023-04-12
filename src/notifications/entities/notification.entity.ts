import { UserNotification } from 'src/user-notifications/entities/user-notification.entity';

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  discription: string;
  @OneToMany(
    () => UserNotification,
    (userNotification) => userNotification.notification,
  )
  userNotification: UserNotification[];
}
