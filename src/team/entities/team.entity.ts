import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  description: string;

  @Column()
  name: string;

  @ManyToMany(() => User, { cascade: true })
  @JoinTable({
    name: 'user_team',
  })
  users: User[];
}
