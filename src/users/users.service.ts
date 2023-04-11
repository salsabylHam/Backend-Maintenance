import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    const password = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      ...createUserDto,
      password,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const userRepository = await this.usersRepository.save(user);
  }
  async find(query) {
    const { relations, ...where } = query;
    const users = await this.usersRepository.find({
      relations: relations || {},
      where: where || {},
    });
    const usersWithoutPasswords = await Promise.all(
      users.map(async (user) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, confirmePassword, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }),
    );
    return usersWithoutPasswords;
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const userRepository = await this.usersRepository.findOneBy({ id });
    if (userRepository) {
      this.usersRepository.update(id, updateUserDto);
    } else {
      return 'no user found with this id';
    }
  }
  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
