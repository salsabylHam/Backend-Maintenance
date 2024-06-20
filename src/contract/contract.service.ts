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
  ) {}

  create(createContractDto: CreateContractDto) {
    try {
      return this.contractRepository.save(createContractDto);
    } catch (err) {
      throw new CustomErrorException(err);
    }
  }

  findAll(query: any) {
    try {
      const { relations, ...where } = query;
      return this.contractRepository.find({
        relations: !!relations
          ? Object.keys(relations).reduce((a, v) => ({ ...a, [v]: true }), {})
          : {},
        where: where || {},
      });
    } catch (err) {
      throw new CustomErrorException(err);
    }
  }

  async update(id: number, updateContractDto: UpdateContractDto) {
    try {
      const contract = await this.contractRepository.findOneBy({ id });
      if (!contract) {
        throw new CustomErrorException({
          status: 404,
          message: `No contract found with id ${id}`,
        });
      }
      return this.contractRepository.update(id, updateContractDto);
    } catch (err) {
      throw new CustomErrorException(err);
    }
  }

  remove(id: number) {
    return this.contractRepository.delete(id);
  }
}
