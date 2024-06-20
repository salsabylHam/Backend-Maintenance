import { Client } from 'src/client/entities/client.entity';
import { Contract } from 'src/contract/entities/contract.entity';
import { Demande } from 'src/demande/entities/demande.entity';
import { Machine } from 'src/machine/entities/machine.entity';
import { OrderTechnician } from 'src/order_technicians/entities/order_technician.entity';
import { Piece } from 'src/piece/entities/piece.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column()
  path: string;

  @Column({ nullable: true })
  requestId: number;

  @Column({ nullable: true })
  machineId: number;

  @Column({ nullable: true })
  clientId: number;

  @Column({ nullable: true })
  contractId: number;

  @Column({ nullable: true })
  pieceId: number;

  @Column({ nullable: true })
  orderTechnicianId: number;

  @ManyToOne(() => Demande, (demande) => demande.files, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  request: Demande;

  @ManyToOne(() => Machine, (machine) => machine.files, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  machine: Machine;

  @ManyToOne(() => Piece, (piece) => piece.files, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  piece: Piece;

  @ManyToOne(() => Client, (client) => client.files, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  client: Client;

  @ManyToOne(() => Contract, (contract) => contract.files, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  contract: Contract;

  @ManyToOne(
    () => OrderTechnician,
    (orderTechnician) => orderTechnician.files,
    {
      onDelete: 'CASCADE',
      orphanedRowAction: 'delete',
    },
  )
  orderTechnician: OrderTechnician;
}
