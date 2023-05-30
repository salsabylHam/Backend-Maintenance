import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { In, Repository } from 'typeorm';
import { CreateOrderTransaction } from './transaction/order.transaction';
import { CustomErrorException } from 'src/shared/errors/custom-error.exception';
import * as _ from 'lodash';
import { OrderTechnician } from 'src/order_technicians/entities/order_technician.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderTechnician)
    private readonly orderTechnicianRepository: Repository<OrderTechnician>,
    private readonly createOrderTransaction: CreateOrderTransaction,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const order = await this.createOrderTransaction.run(createOrderDto);

      return this.find({
        id: order.orderId,
        relations: {
          orderTechnician: true,
          demande: true,
        },
      });
    } catch (error) {
      throw new CustomErrorException(error);
    }
  }

  find(query) {
    try {
      const { relations, ...where } = query;
      return this.orderRepository.find({
        relations: !!relations
          ? Object.keys(relations).reduce((a, v) => ({ ...a, [v]: true }), {})
          : {},
        where: where || {},
      });
    } catch (error) {
      throw new CustomErrorException(error);
    }
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    try {
      const queries = [];
      const order = await this.orderRepository.find({
        relations: ['orderTechnician'],
        where: { id },
      });

      if (!order.length) {
        throw new CustomErrorException({
          status: 404,
          message: `No order found with id ${id}`,
        });
      }

      queries.push(
        this.orderTechnicianRepository.save(
          updateOrderDto.orderTechnician
            .filter(
              (orderT) =>
                !order[0].orderTechnician.find((el) => el.orderId == orderT),
            )
            .map((technichan) => {
              return {
                orderId: id,
                userId: technichan,
              } as any;
            }),
        ),
      );
      queries.push(
        this.orderTechnicianRepository.delete({
          id: In(
            order[0].orderTechnician
              .filter(
                (orderT) =>
                  !updateOrderDto.orderTechnician.find(
                    (el) => el == orderT.userId,
                  ),
              )
              .map((orderT) => orderT.userId),
          ),
        }),
      );
      queries.push(
        this.orderRepository.save({
          ..._.omit(updateOrderDto, ['orderTechnician']),
          id,
        }),
      );

      return await Promise.all(queries)[2];
    } catch (err) {
      throw new CustomErrorException(err);
    }
  }

  remove(id: number) {
    return this.orderRepository.delete({ id });
  }
}
