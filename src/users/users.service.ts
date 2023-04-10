import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const userRepository = await this.usersRepository.save(createUserDto);
  }
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
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
