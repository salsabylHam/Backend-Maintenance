import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderTransaction } from './transaction/order.transaction';
import { CustomErrorException } from 'src/shared/errors/custom-error.exception';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
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
      const order = await this.orderRepository.findOneBy({ id });
      if (!order) {
        throw new CustomErrorException({
          status: 404,
          message: `No order found with id ${id}`,
        });
      }
      return this.orderRepository.update({ id }, updateOrderDto);
    } catch (err) {
      throw new CustomErrorException(err);
    }
  }

  remove(id: number) {
    return this.orderRepository.delete({ id });
  }
}
