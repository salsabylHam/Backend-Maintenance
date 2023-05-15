import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { CustomErrorException } from 'src/shared/errors/custom-error.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { confirmePassword, password, ...profile } = createUserDto;
      const user = await this.usersRepository.save({
        ...profile,
        password: password ? await bcrypt.hash(password, 10) : '',
      });
      return !!user;
    } catch (error) {
      throw new CustomErrorException(error);
    }
  }
  async find(query, options?: any) {
    try {
      const { relations, ...where } = query;
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
        relations: !!relations
          ? Object.keys(relations).reduce((a, v) => ({ ...a, [v]: true }), {})
          : {},
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
      return this.usersRepository.update(query, updateUserDto);
    } catch (err) {
      throw new CustomErrorException(err);
    }
  }
  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
