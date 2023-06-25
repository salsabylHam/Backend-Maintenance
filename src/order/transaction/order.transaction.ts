import { Injectable } from '@nestjs/common';
import { BaseTransaction } from 'src/shared/transaction/base.transaction';
import { CreateOrderDto } from '../dto/create-order.dto';
import { EntityManager, Connection } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderTechnician } from 'src/order_technicians/entities/order_technician.entity';

@Injectable()
export class CreateOrderTransaction extends BaseTransaction<
  CreateOrderDto,
  { orderId: number }
> {
  constructor(connection: Connection) {
    super(connection);
  }

  // the important thing here is to use the manager that we've created in the base class
  protected async execute(
    orderDTO: CreateOrderDto,
    manager: EntityManager,
  ): Promise<{
    orderId: number;
  }> {
    try {
      const { orderTechnician, ...orderData } = orderDTO;
      const order = await manager.save(Order, { ...orderData });

      await manager.save(
        OrderTechnician,
        orderTechnician.map((technichan) => {
          return {
            orderId: order.id,
            userId: technichan,
          } as any;
        }),
      );
      return {
        orderId: order.id,
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
