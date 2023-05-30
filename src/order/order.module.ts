import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderTransaction } from './transaction/order.transaction';
import { OrderTechniciansModule } from 'src/order_technicians/order_technicians.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), OrderTechniciansModule],
  controllers: [OrderController],
  providers: [OrderService, CreateOrderTransaction],
})
export class OrderModule {}
