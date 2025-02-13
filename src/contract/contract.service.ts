import { Injectable } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contract } from './entities/contract.entity';
import { Repository } from 'typeorm';
import { CustomErrorException } from 'src/shared/errors/custom-error.exception';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private contractRepository: Repository<Contract>,
  ) { }

  create(createContractDto: CreateContractDto, enterpriseId: number) {
    try {
      return this.contractRepository.save({
        ...createContractDto,
        enterprise: {
          id: enterpriseId
        }
      });
    } catch (err) {
      throw new CustomErrorException(err);
    }
  }

  findAll(query: any) {
    try {
      console.log(query)
      const { relations, ...where } = query;
      return this.contractRepository.find({
        relations: relations,
        where: where || {},
      });
    } catch (err) {
      throw new CustomErrorException(err);
    }
  }

  async update(query: any, updateContractDto: UpdateContractDto) {
    try {
      const contract = await this.contractRepository.findOneBy(query);
      if (!contract) {
        throw new CustomErrorException({
          status: 404,
          message: `No contract found with querry ${query}`,
        });
      }
      return this.contractRepository.update(query, updateContractDto);
    } catch (err) {
      throw new CustomErrorException(err);
    }
  }

  remove(query: any) {
    return this.contractRepository.delete(query);
  }
}
