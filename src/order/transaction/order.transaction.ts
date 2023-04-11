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
    const { demandeId, orderTechnichans } = orderDTO;
    const order = await manager.create(Order, {
      demandeId,
    });
    await manager.create(
      OrderTechnician,
      orderTechnichans.map((orderTechnichan) => {
        return {
          orderId: order.id,
          ...orderTechnichan,
        };
      }),
    );
    return {
      orderId: order.id,
    };
  }
}
