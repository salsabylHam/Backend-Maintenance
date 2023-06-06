import { Module } from '@nestjs/common';
import { OrderTechniciansService } from './order_technicians.service';
import { OrderTechniciansController } from './order_technicians.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderTechnician } from './entities/order_technician.entity';
import { OrderTechnicianPiecesModule } from 'src/order-technician-pieces/order-technician-pieces.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderTechnician]),
    OrderTechnicianPiecesModule,
  ],
  controllers: [OrderTechniciansController],
  providers: [OrderTechniciansService],
  exports: [OrderTechniciansService, TypeOrmModule],
})
export class OrderTechniciansModule {}
