import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderTransaction } from './transaction/order.transaction';
import { OrderTechniciansModule } from 'src/order_technicians/order_technicians.module';
import { WebsocketGatewayModule } from 'src/websocket-gateway/websocket-gateway.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    OrderTechniciansModule,
    WebsocketGatewayModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, CreateOrderTransaction],
  exports: [OrderService],
})
export class OrderModule {}
