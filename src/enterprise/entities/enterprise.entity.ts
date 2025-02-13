import { AuthConfig } from 'src/auth-config/entities/auth-config.entity';
import { Client } from 'src/client/entities/client.entity';
import { Contract } from 'src/contract/entities/contract.entity';
import { Demande } from 'src/demande/entities/demande.entity';
import { Machine } from 'src/machine/entities/machine.entity';
import { Order } from 'src/order/entities/order.entity';
import { Piece } from 'src/piece/entities/piece.entity';
import { User } from 'src/users/entities/user.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Enterprise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ unique: true })
  code: string;

  @OneToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  owner: User;

  @OneToMany(() => User, (user) => user.enterprise)
  workers: User[];

  @OneToMany(() => AuthConfig, (config) => config.enterprise)
  authMethods: AuthConfig[];

  @OneToMany(() => Order, (order) => order.enterprise)
  orders: Order[];

  @OneToMany(() => Machine, (machine) => machine.enterprise)
  machines: Machine[];

  @OneToMany(() => Demande, (demande) => demande.enterprise)
  demands: Demande[];

  @OneToMany(() => Piece, (piece) => piece.enterprise)
  pieces: Piece[];

  @OneToMany(() => Client, (client => client.enterprise))
  clients: Client[]

  
  @OneToMany(() => Contract, (contract => contract.enterprise))
  contracts: Contract[]
}
