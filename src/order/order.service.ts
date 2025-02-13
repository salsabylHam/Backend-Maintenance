import { Injectable } from '@nestjs/common';
import { orderBodyDto } from './dto/create-order.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { DataSource, Repository } from 'typeorm';
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
    @InjectDataSource()
    private readonly dataSource: DataSource,
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

  increaseRate(enterpriseCode: string) {
    // TODO: make the frontend give the start and end date 
    const startDate = '2024-01-00'; // replace with your actual start date
    const endDate = '2024-07-01'; // replace with your actual end date

    const subQuery = this.orderRepository
      .createQueryBuilder('Order')
      .select([])
      .addSelect('MONTH(Order.startDate)', 'month')
      .addSelect('YEAR(Order.startDate)', 'year')
      .addSelect('COUNT(*)', 'order_count')
      .innerJoin(
        'Order.enterprise',
        'enterprise',
        'enterprise.code = :enterpriseCode',
        { enterpriseCode },
      )
      .where('Order.endDate IS NOT NULL')
      .groupBy('year, month')
      .orderBy('year, month');

    const dateSeriesQuery = `
    WITH RECURSIVE date_series AS (
      SELECT DATE_FORMAT(:startDate, '%Y-%m-01') AS date
      UNION ALL
      SELECT DATE_ADD(date, INTERVAL 1 MONTH)
      FROM date_series
      WHERE date < DATE_FORMAT(:endDate, '%Y-%m-01')
    )
    SELECT
      YEAR(date) AS year,
      MONTH(date) AS month,
      0 AS order_count,
      date AS formatted_date
    FROM date_series
  `;

    const mainQuery = this.dataSource
      .createQueryBuilder()
      .addSelect('date_series.month', 'month')
      .addSelect('date_series.year', 'year')
      .addSelect('COALESCE(monthly_counts.order_count, 0)', 'order_count')
      .addSelect(
        'COALESCE(monthly_counts.order_count - LAG(monthly_counts.order_count, 1) OVER (ORDER BY date_series.year, date_series.month), 0)',
        'absolute_change',
      )
      .addSelect(
        `COALESCE(ROUND((monthly_counts.order_count - LAG(monthly_counts.order_count, 1) OVER (ORDER BY date_series.year, date_series.month)) * 100 / NULLIF(LAG(monthly_counts.order_count, 1) OVER (ORDER BY date_series.year, date_series.month), 0), 2), 0)`,
        'percentage_change',
      )
      .from(`(${dateSeriesQuery})`, 'date_series')
      .leftJoin(
        `(${subQuery.getQuery()})`,
        'monthly_counts',
        'date_series.year = monthly_counts.year AND date_series.month = monthly_counts.month',
      )
      .setParameters({ ...subQuery.getParameters(), startDate, endDate })
      .orderBy('date_series.year', 'DESC')
      .addOrderBy('date_series.month', 'DESC');

    return mainQuery.getRawMany();
  }

  async count(enterpriseCode: string) {
    return this.orderRepository.count({
      where: {
        enterprise: {
          code: enterpriseCode,
        },
      },
    });
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
