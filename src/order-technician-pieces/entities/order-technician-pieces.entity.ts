import { OrderTechnician } from 'src/order_technicians/entities/order_technician.entity';
import { Piece } from 'src/piece/entities/piece.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('piece_order_technician')
export class OrderTechnicianPieces {
  @Column()
  @PrimaryColumn({ type: 'integer' })
  orderTechnicianId: number;

  @Column()
  @PrimaryColumn({ type: 'integer' })
  pieceId: Date;

  @Column()
  qty: number;

  @ManyToOne(() => Piece, (piece) => piece.orderTechnicianPieces)
  @JoinColumn({ name: 'pieceId' })
  public piece: Piece;

  @ManyToOne(
    () => OrderTechnician,
    (orderTechnician) => orderTechnician.orderTechnicianPieces,
  )
  @JoinColumn({ name: 'orderTechnicianId' })
  public orderTechnician: OrderTechnician;
}
