import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/order/entities/order.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class StatistiquesService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getnbrOfOrdersByYear(year?: number) {
    year = year || parseInt(moment().format('YYYY'));
    const startDate = `${year}-01-01`;
    const endDate = `${year}-12-31`;

    const orders = await this.orderRepository.find({
      select: ['startDate'],
      where: {
        occurrence: 'Once',
        startDate: MoreThanOrEqual(startDate),
        endDate: LessThanOrEqual(endDate),
      },
    });

    return orders.reduce((result, order) => {
      if (result[moment(order.startDate).format('MMM')]) {
        result[moment(order.startDate).format('MMM')].push(order);
      } else {
        result[moment(order.startDate).format('MMM')] = [order];
      }
      return result;
    }, {});
  }
}
