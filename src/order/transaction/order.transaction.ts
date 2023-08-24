import { Injectable } from '@nestjs/common';
import { BaseTransaction } from 'src/shared/transaction/base.transaction';
import { CreateOrderDto, orderBodyDto } from '../dto/create-order.dto';
import { EntityManager, Connection, In } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderTechnician } from 'src/order_technicians/entities/order_technician.entity';
import { CustomErrorException } from 'src/shared/errors/custom-error.exception';

@Injectable()
export class CreateOrderTransaction extends BaseTransaction<
  orderBodyDto,
  { status: string }
> {
  constructor(connection: Connection) {
    super(connection);
  }

  // the important thing here is to use the manager that we've created in the base class
  protected async execute(
    orderDTO: orderBodyDto,
    manager: EntityManager,
  ): Promise<{
    status: string;
  }> {
    try {
      if (orderDTO.steps && orderDTO.steps.length) {
        const q = [];
        let chainCode = Math.random().toString(36).slice(2);

        if (orderDTO.steps.length && orderDTO.steps[0]['chainCode']) {
          chainCode = orderDTO.steps[0]['chainCode'];
        }

        for (let index = 0; index < orderDTO.steps.length; index++) {
          const step = orderDTO.steps[index];

          if (!step['chainCode']) {
            step['chainCode'] = chainCode;
          }
          step['chainIndex'] = index;
          q.push(this.addOrder(step, manager));
          await Promise.all(q);
        }
      } else if (!orderDTO.steps) {
        await this.addOrder(orderDTO, manager);
      }

      return { status: 'success' };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async addOrder(orderDTO: CreateOrderDto, manager: EntityManager) {
    try {
      const { orderTechnician, ...orderData } = orderDTO;

      if (orderData['id']) {
        const order = await manager.find(Order, {
          relations: ['orderTechnician'],
          where: { id: orderData['id'] },
        });

        if (!order.length) {
          throw new CustomErrorException({
            status: 404,
            message: `No order found with id ${orderData['id']}`,
          });
        }

        if (orderDTO.orderTechnician) {
          await manager.save(
            OrderTechnician,
            orderDTO.orderTechnician
              .filter(
                (orderT) =>
                  !order[0].orderTechnician.find((el) => el.orderId == orderT),
              )
              .map((technichan) => {
                return {
                  orderId: orderData['id'],
                  userId: technichan,
                } as any;
              }),
          );
          await manager.delete(OrderTechnician, {
            id: In(
              order[0].orderTechnician
                .filter(
                  (orderT) =>
                    !orderDTO.orderTechnician.find((el) => el == orderT.userId),
                )
                .map((orderT) => orderT.userId),
            ),
          });
        }
      }
      const order = await manager.save(Order, { ...orderData });

      if (!orderData['id']) {
        await manager.save(
          OrderTechnician,
          orderTechnician.map((technichan) => {
            return {
              orderId: order.id,
              userId: technichan,
            } as any;
          }),
        );
      }
    } catch (err) {
      throw err;
    }
  }
}
