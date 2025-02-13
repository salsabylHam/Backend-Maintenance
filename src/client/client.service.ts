import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { CustomErrorException } from 'src/shared/errors/custom-error.exception';
import { File } from 'src/files/entities/file.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) { }

  async create(createClientDto: CreateClientDto, enterpriseId: number) {
    try {
      const logo = createClientDto.logo
      delete createClientDto.logo
      createClientDto.files.push(logo)
      const client = await this.clientRepository.save({
        ...createClientDto, enterprise: {
          id: enterpriseId
        }
      })
      const logoData = (client.files as File[]).find((file: File) => (file.name == logo.name && file.path == logo.path))
      await this.clientRepository.update({ id: client.id }, { logo: logoData.id });
      client.logo = logoData.id
      return client
    } catch (err) {
      throw new CustomErrorException(err);
    }
  }

  findAll(query: any, enterpriseId: number) {
    try {
      const { relations, ...where } = query;
      return this.clientRepository.find({
        relations: relations,
        where: (where || {}) && {
          enterprise: {
            id: enterpriseId
          }
        },
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
