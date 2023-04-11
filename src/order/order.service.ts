import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderTransaction } from './transaction/order.transaction';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly createOrderTransaction: CreateOrderTransaction,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const order = await this.createOrderTransaction.run(createOrderDto);
    return this.find({
      id: order.orderId,
      relations: {
        orderTechnician: true,
        demande: true,
      },
    });
  }

  find(query) {
    const { relations, ...where } = query;
    return this.orderRepository.find({
      relations: relations || {},
      where: where || {},
    });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.orderRepository.update({ id }, updateOrderDto);
  }

  remove(id: number) {
    return this.orderRepository.delete({ id });
  }
}
