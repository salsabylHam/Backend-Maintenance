import { Contract } from 'src/contract/entities/contract.entity';
import { File } from 'src/files/entities/file.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  type: string;

  @Column()
  logo: string;

  @Column()
  description: string;

  @Column()
  contact: string;

  @Column()
  location: string;

  @Column()
  personnel: string;

  @OneToMany(() => Contract, (contract) => contract.client)
  contracts: Contract[];

  @OneToMany(() => File, (file) => file.client, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  files: File[];
}
