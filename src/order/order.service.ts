import { Injectable } from '@nestjs/common';
import { orderBodyDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderTransaction } from './transaction/order.transaction';
import { CustomErrorException } from 'src/shared/errors/custom-error.exception';
import * as _ from 'lodash';
import { OrderTechnician } from 'src/order_technicians/entities/order_technician.entity';
import { WebsocketGatewayService } from 'src/websocket-gateway/websocket-gateway.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderTechnician)
    private readonly orderTechnicianRepository: Repository<OrderTechnician>,
    private readonly createOrderTransaction: CreateOrderTransaction,
    private readonly webSocketGatewayService: WebsocketGatewayService,
  ) {}

  async create(createOrderDto: orderBodyDto) {
    try {
      await this.createOrderTransaction.run(createOrderDto);
      this.webSocketGatewayService.emitEventWithWS(
        'updateNotificationBadges',
        true,
      );
      return { status: 'success' };
    } catch (error) {
      throw new CustomErrorException(error);
    }
  }

  async find(query, user?: any) {
    try {
      const { relations, ...where } = query;
      if (where.myOrders) {
        where.orderTechnician = { userId: user.id };

        if (!relations.includes('orderTechnician')) {
          relations.push('orderTechnician');
        }

        delete where.myOrders;
      }
      const orders = await this.orderRepository.find({
        relations: relations ?? [],
        where: where || {},
      });

      if (!where.myOrders) {
        const resOrders = [];

        const groupedOrders = orders.reduce((res, order) => {
          if (order.chainCode) {
            res[order.chainCode] = res[order.chainCode] || [];
            res[order.chainCode].push(order);
          } else {
            res[order.id] = order;
          }
          return res;
        }, {});

        Object.values(groupedOrders).forEach((group) => {
          if (_.isArray(group)) {
            const sortedGroup = _.sortBy(group, 'stepIndex');
            resOrders.push({ ...sortedGroup.shift(), steps: sortedGroup });
          } else {
            resOrders.push(group);
          }
        });
        return resOrders;
      }
      return orders;
    } catch (error) {
      throw new CustomErrorException(error);
    }
  }

  remove(id: number) {
    return this.orderRepository.delete({ id });
  }
}
