import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import * as moment from 'moment';
import { downloadExcel } from 'src/shared/helpers/excel.helper';

@Injectable()
export class TimeTrackingService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getTechniciansWorktime(query: any) {
    const technicians = await this.usersRepository.find({
      relations: {
        role: true,
        orderTechnician: true,
      },
      where: {
        role: {
          code: 'TECHNICIANS_ROLE',
        },
        orderTechnician: {
          startDate: MoreThanOrEqual(query.startDate),
          endDate: LessThanOrEqual(query.endDate),
        },
      },
    });

    return technicians.map((technician) => {
      return {
        name: `${technician.firstName} ${technician.lastName}`,
        startDate: query.startDate,
        endDate: query.endDate,
        nbHours: technician.orderTechnician.reduce((result, order) => {
          const diffDays = moment(order.endDate).diff(
            moment(order.startDate),
            'days',
          );

          if (diffDays > 1) {
            return diffDays * 8;
          } else {
            return (
              result +
              moment(order.endDate).diff(moment(order.startDate), 'hours')
            );
          }
        }, 0),
      };
    });
  }

  exportDataToExcel(data: any) {
    return downloadExcel(data);
  }
}
