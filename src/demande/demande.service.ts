import { Injectable } from '@nestjs/common';
import { UpdateDemandeDto } from './dto/update-demande.dto';
import { Demande } from './entities/demande.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { CustomErrorException } from 'src/shared/errors/custom-error.exception';
import { WebsocketGatewayService } from 'src/websocket-gateway/websocket-gateway.service';
import * as _ from 'lodash';
import { PRIORITY } from 'src/shared/enums/priority.enums';
@Injectable()
export class DemandeService {
  constructor(
    @InjectRepository(Demande)
    private demandeRepository: Repository<Demande>,
    private readonly webSocketGatewayService: WebsocketGatewayService,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  create(demande: any) {
    try {
      return this.demandeRepository.save(demande).then(() => {
        this.webSocketGatewayService.emitEventWithWS(
          'updateNotificationBadges',
          true,
        );
      });
    } catch (err) {
      throw new CustomErrorException(err);
    }
  }

  async find(query: any) {
    try {
      const { relations, ...where } = query;

      const indexNewData = _.isArray(relations)
        ? relations.indexOf('newData')
        : Object.keys(relations).indexOf('newData');

      if (indexNewData != -1) {
        if (_.isArray(relations)) {
          relations.splice(indexNewData, 1);
        } else {
          delete relations.newData;
        }
        relations.push('orders');
      }

      const requests = await this.demandeRepository.find({
        relations: relations,
        where: where || {},
      });

      if (indexNewData == -1) {
        return requests;
      }

      return requests.map((request) => {
        if (!request?.orders?.length) {
          request['isNewData'] = true;
        }

        return _.omit(request, 'orders');
      });
    } catch (err) {
      throw new CustomErrorException(err);
    }
  }

  async update(id: number, updateDemandeDto: UpdateDemandeDto) {
    try {
      const demande = await this.demandeRepository.findOneBy({ id });
      if (!demande) {
        throw new CustomErrorException({
          status: 404,
          message: `No demande found with id ${id}`,
        });
      }
      return this.demandeRepository
        .save(this.demandeRepository.create({ ...updateDemandeDto, id }))
        .then(() => {
          this.webSocketGatewayService.emitEventWithWS(
            'updateNotificationBadges',
            true,
          );
        });
    } catch (err) {
      throw new CustomErrorException(err);
    }
  }

  remove(id: number) {
    return this.demandeRepository.delete({ id });
  }

  count(code: string) {
    return this.demandeRepository.count({
      where: {
        enterprise: {
          code,
        },
      },
    });
  }

  async machineDownRate(enterpriseCode: string) {
    const startDate = '2024-01-01'; // replace with your actual start date
    const endDate = '2024-07-01'; // replace with your actual start date

    const subQuery = this.demandeRepository
      .createQueryBuilder('Demande')
      .select([])
      .addSelect('MONTH(Demande.createdAt)', 'month')
      .addSelect('YEAR(Demande.createdAt)', 'year')
      .addSelect('COUNT(*)', 'demand_count')
      .innerJoin('Demande.machine', 'machine')
      .innerJoin(
        'Demande.enterprise',
        'enterprise',
        'enterprise.code = :enterpriseCode',
        { enterpriseCode },
      )
      .where('Demande.priority = :priority', { priority: PRIORITY.HIGH })
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
    0 AS demand_count,
    date AS formatted_date
  FROM date_series
`;

    const mainQuery = this.dataSource
      .createQueryBuilder()
      .addSelect('date_series.month', 'month')
      .addSelect('date_series.year', 'year')
      .addSelect('COALESCE(monthly_counts.demand_count, 0)', 'demand_count')
      .addSelect(
        'COALESCE(monthly_counts.demand_count - LAG(monthly_counts.demand_count, 1) OVER (ORDER BY date_series.year, date_series.month), 0)',
        'absolute_change',
      )
      .addSelect(
        `COALESCE(ROUND((monthly_counts.demand_count - LAG(monthly_counts.demand_count, 1) OVER (ORDER BY date_series.year, date_series.month)) * 100 / NULLIF(LAG(monthly_counts.demand_count, 1) OVER (ORDER BY date_series.year, date_series.month), 0), 2), 0)`,
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

  increaseRate(enterpriseCode: string) {
    const startDate = '2024-01-01'; // replace with your actual start date
    const endDate = '2024-07-01'; // replace with your actual start date

    const subQuery = this.demandeRepository
      .createQueryBuilder('Demande')
      .select([])
      .addSelect('MONTH(Demande.createdAt)', 'month')
      .addSelect('YEAR(Demande.createdAt)', 'year')
      .addSelect('COUNT(*)', 'demand_count')
      .innerJoin('Demande.machine', 'machine')
      .innerJoin(
        'Demande.enterprise',
        'enterprise',
        'enterprise.code = :enterpriseCode',
        { enterpriseCode },
      )
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
      0 AS demand_count,
      date AS formatted_date
    FROM date_series
  `;

    const mainQuery = this.dataSource
      .createQueryBuilder()
      .addSelect('date_series.month', 'month')
      .addSelect('date_series.year', 'year')
      .addSelect('COALESCE(monthly_counts.demand_count, 0)', 'demand_count')
      .addSelect(
        'COALESCE(monthly_counts.demand_count - LAG(monthly_counts.demand_count, 1) OVER (ORDER BY date_series.year, date_series.month), 0)',
        'absolute_change',
      )
      .addSelect(
        `COALESCE(ROUND((monthly_counts.demand_count - LAG(monthly_counts.demand_count, 1) OVER (ORDER BY date_series.year, date_series.month)) * 100 / NULLIF(LAG(monthly_counts.demand_count, 1) OVER (ORDER BY date_series.year, date_series.month), 0), 2), 0)`,
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

  async rateByPriority(enterpriseCode: string) {
    //TODO: We need to filter the request that are done
    const data = this.demandeRepository
      .createQueryBuilder('Demande')
      .select([])
      .addSelect('Demande.priority', 'priority')
      .addSelect('COUNT(*)', 'count')
      .innerJoin(
        'Demande.enterprise',
        'enterprise',
        'enterprise.code = :enterpriseCode',
        { enterpriseCode },
      )
      .groupBy('Demande.priority')
      .getRawMany();
    return data;
  }
}
