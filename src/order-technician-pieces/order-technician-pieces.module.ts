import { Module } from '@nestjs/common';
import { OrderTechnicianPiecesService } from './order-technician-pieces.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderTechnicianPieces } from './entities/order-technician-pieces.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderTechnicianPieces])],
  providers: [OrderTechnicianPiecesService],
  exports: [OrderTechnicianPiecesService, TypeOrmModule],
})
export class OrderTechnicianPiecesModule {}
