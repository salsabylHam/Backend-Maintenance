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

  async create(createUserDto: CreateUserDto) {
    const { confirmePassword, password, ...profile } = createUserDto;
    const user = await this.usersRepository.save({
      ...profile,
      password: await bcrypt.hash(password, 10),
    });
    return !!user;
  }
  async find(query, options: any = { noPassword: false }) {
    const { relations, ...where } = query;
    const users = await this.usersRepository.find({
      relations:
        Object.keys(relations).reduce((a, v) => ({ ...a, [v]: true }), {}) ||
        {},
      where: where || {},
    });
    if (!options.noPassword) return users;
    const usersWithoutPasswords = users.map((user) => {
      delete user.password;
      return user;
    });

    return usersWithoutPasswords;
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
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
