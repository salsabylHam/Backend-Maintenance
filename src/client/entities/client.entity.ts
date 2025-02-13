import { Contract } from 'src/contract/entities/contract.entity';
import { Enterprise } from 'src/enterprise/entities/enterprise.entity';
import { File } from 'src/files/entities/file.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column("simple-array")
  type: string[];

  // id of the file in files
  @Column({ nullable: true })
  logo: number;

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
  })
  files: File[];

  @ManyToOne(() => Enterprise, (enterprise) => enterprise.clients)
  enterprise: Enterprise
}
