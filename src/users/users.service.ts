import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { CustomErrorException } from 'src/shared/errors/custom-error.exception';
import * as _ from 'lodash';
import { MailService } from 'src/mail/mail.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly mailService: MailService,
    private readonly authService: AuthService,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async createFromProfile(user: any, enterpriseCode) {
    return;
  }
  async increaseRate(enterpriseCode) {

    // TODO: make the frontend give the start and end date 
    const startDate = '2024-01-00'; // replace with your actual start date
    const endDate = '2024-07-01'; // replace with your actual end date

    const subQuery = this.usersRepository
      .createQueryBuilder('User')
      .select([])
      .addSelect('MONTH(User.created_at)', 'month')
      .addSelect('YEAR(User.created_at)', 'year')
      .addSelect('COUNT(*)', 'user_count')
      .innerJoin(
        'User.enterprise',
        'enterprise',
        'enterprise.code = :enterpriseCode',
        { enterpriseCode },
      )
      .where('User.created_at BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
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
        0 AS user_count,
        date AS formatted_date
      FROM date_series
    `;

    const mainQuery = this.dataSource
      .createQueryBuilder()
      .addSelect('COALESCE(monthly_counts.user_count, 0)', 'user_count')
      .addSelect(
        'COALESCE(ROUND((monthly_counts.user_count - LAG(monthly_counts.user_count, 1) OVER (ORDER BY monthly_counts.year, monthly_counts.month)) * 100 / LAG(monthly_counts.user_count, 1) OVER (ORDER BY monthly_counts.year, monthly_counts.month), 2),0)',
        'change_percentage',
      )
      .addSelect(`DATE_FORMAT(date_series.formatted_date, '%Y-%m-%d')`, 'date')
      .addSelect(
        'SUM(COALESCE(monthly_counts.user_count, 0)) OVER (ORDER BY date_series.year, date_series.month)',
        'total_users',
      )
      .from(`(${dateSeriesQuery})`, 'date_series')
      .leftJoin(
        `(${subQuery.getQuery()})`,
        'monthly_counts',
        'date_series.year = monthly_counts.year AND date_series.month = monthly_counts.month',
      )
      .setParameters({ ...subQuery.getParameters(), startDate, endDate })
      .orderBy('date', 'DESC');

    return mainQuery.getRawMany();
  }
  async count(enterpriseCode: string) {
    return this.usersRepository.count({
      where: {
        enterprise: {
          code: enterpriseCode,
        },
      },
    });
  }

  async create(
    createUserDto: CreateUserDto,
    enterpriseCode?: string,
    option: {
      changePassword: boolean;
    } = { changePassword: false },
  ) {
    try {
      const { confirmePassword: _, password, ...profile } = createUserDto;

      const user = await this.usersRepository.save({
        ...profile,
        roleId: profile.roleId ? +profile.roleId : null,
        password: password ? await bcrypt.hash(password, 10) : '',
      });

      const token = this.authService.sign({
        email: user.email,
        enterpriseCode,
      });
      this.mailService.sendUserForgotPasswordUrl(user, token);
      if (!!user == false) throw new Error('Failed to create user');
      return user;
    } catch (error) {
      throw new CustomErrorException(error);
    }
  }

  async updateRaw(query: any, user: Partial<User>) {
    return this.usersRepository.update(query, user);
  }
  async find(query, options?: any) {
    try {
      // eslint-disable-next-line prefer-const
      let { relations, ...where } = query;

      if (relations && relations.includes('role') && where.roleCode) {
        where = {
          ...where,
          role: {
            code: where.roleCode,
          },
        };
        where = _.omit(where, ['roleCode']);
      }

      const users = await this.usersRepository.find({
        select:
          options && options.withPassword
            ? {
                password: true,
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                roleId: true,
                picture: true,
                phone2: true,
                phone: true,
              }
            : undefined,
        relations: relations,
        where: where || {},
      });

      return users;
    } catch (error) {
      throw new CustomErrorException(error);
    }
  }

  async update(query: any, updateUserDto: UpdateUserDto) {
    try {
      const userRepository = await this.usersRepository.findOneBy(query);
      if (!userRepository) {
        throw new CustomErrorException({
          status: 404,
          message: `No user found`,
        });
      }

      return this.usersRepository.save({
        ...userRepository,
        ...updateUserDto,
        roleId: updateUserDto.roleId
          ? parseInt(updateUserDto.roleId)
          : userRepository.roleId,
      });
    } catch (err) {
      throw new CustomErrorException(err);
    }
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
