import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { CustomErrorException } from 'src/shared/errors/custom-error.exception';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  create(createClientDto: CreateClientDto) {
    try {
      return this.clientRepository.save(createClientDto);
    } catch (err) {
      throw new CustomErrorException(err);
    }
  }

  findAll(query: any) {
    try {
      const { relations, ...where } = query;
      return this.clientRepository.find({
        relations: !!relations
          ? Object.keys(relations).reduce((a, v) => ({ ...a, [v]: true }), {})
          : {},
        where: where || {},
      });
    } catch (err) {
      throw new CustomErrorException(err);
    }
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    try {
      const client = await this.clientRepository.findOneBy({ id });
      if (!client) {
        throw new CustomErrorException({
          status: 404,
          message: `No client found with id ${id}`,
        });
      }
      return this.clientRepository.save({ id, ...updateClientDto });
    } catch (err) {
      throw new CustomErrorException(err);
    }
  }

  remove(id: number) {
    return this.clientRepository.delete(id);
  }
}
