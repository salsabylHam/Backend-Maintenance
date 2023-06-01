import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { CustomErrorException } from 'src/shared/errors/custom-error.exception';
import { TeamService } from 'src/team/team.service';
import * as _ from 'lodash';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly teamService: TeamService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmePassword, password, ...profile } = createUserDto;

      const user = await this.usersRepository.save({
        ...profile,
        roleId: profile.roleId ? +profile.roleId : null,
        password: password ? await bcrypt.hash(password, 10) : '',
      });
      return !!user;
    } catch (error) {
      throw new CustomErrorException(error);
    }
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
      console.log(updateUserDto);

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
