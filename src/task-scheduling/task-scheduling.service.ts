import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OrderService } from 'src/order/order.service';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Not } from 'typeorm';

@Injectable()
export class TaskSchedulingService {
  private readonly logger = new Logger(TaskSchedulingService.name);
  constructor(private readonly orderService: OrderService) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async createOrders() {
    const orders = await this.orderService.find({
      orderId: null,
      demandeId: null,
      relations: ['orderTechnician'],
      occurrence: Not('Once'),
    });

    for (let index = 0; index < orders.length; index++) {
      const order = orders[index];
      if (order.endDate && order.endDate < new Date().toISOString()) {
        continue;
      }

      const nextReccurence = this.calculateNextRecurrence(
        new Date(order.startDate),
        order.occurrence,
      );

      if (
        moment(moment(nextReccurence).format('YYYY-MM-DD')).diff(
          moment(moment().format('YYYY-MM-DD')),
          'days',
        ) == order.createOrderBefore
      ) {
        await this.orderService.create(
          _.omit(
            Object.assign(order, {
              startDate: `${moment(nextReccurence).format(
                'YYYY-MM-DD',
              )} ${new Date(order.startDate).toLocaleTimeString()}`,

              endDate: `${moment(nextReccurence).format(
                'YYYY-MM-DD',
              )} ${new Date(order.startDate).toLocaleTimeString()}`,

              occurrence: 'Once',
              orderTechnician: order.orderTechnician.map((el) => el.userId),
            }),
            ['id', 'createOrderBefore'],
          ),
        );
      }
    }
  }

  calculateNextRecurrence(startDate, frequency): Date {
    const currentDate = new Date();
    const startDay = startDate.getDate();
    const currentDay = currentDate.getDate();
    const startMonth = startDate.getMonth();
    const currentMonth = currentDate.getMonth();
    const startYear = startDate.getFullYear();
    const currentYear = currentDate.getFullYear();

    if (frequency === 'Weekly') {
      const isLte = startDate < currentDate;
      if (isLte) {
        currentDate.setDate(
          currentDay + ((7 + startDate.getDay() - currentDate.getDay()) % 7),
        );
      } else {
        currentDate.setDate(startDay);
        currentDate.setMonth(startMonth);
        currentDate.setFullYear(startYear);
      }
    } else if (frequency === 'Monthly') {
      const isLteMonth = startMonth <= currentMonth && startYear <= currentYear;
      if (isLteMonth) {
        currentDate.setDate(startDay);
        currentDate.setMonth(currentDate.getMonth() + 1);
      } else {
        currentDate.setDate(startDay);
        currentDate.setMonth(startMonth);
        currentDate.setFullYear(startYear);
      }
    } else if (frequency === 'Yearly') {
      const isLteYear = startYear <= currentYear;
      if (isLteYear) {
        currentDate.setDate(startDay);
        currentDate.setMonth(startMonth);
        currentDate.setFullYear(currentDate.getFullYear() + 1);
      } else {
        currentDate.setDate(startDay);
        currentDate.setMonth(startMonth);
        currentDate.setFullYear(startYear);
      }
    }

    return currentDate;
  }
}
