import { Injectable } from '@nestjs/common';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Machine } from './entities/machine.entity';
import { Repository } from 'typeorm';
import { CustomErrorException } from 'src/shared/errors/custom-error.exception';

@Injectable()
export class MachineService {
  constructor(
    @InjectRepository(Machine)
    private readonly machineRepository: Repository<Machine>,
  ) {}

  create(createMachineDto: CreateMachineDto, enterpriseId: number) {
    try {
      return this.machineRepository.save({
        ...createMachineDto,
        enterprise: {
          id: enterpriseId,
        },
      });
    } catch (err) {
      throw new CustomErrorException(err);
    }
  }

  find(query) {
    try {
      const { relations, ...where } = query;
      return this.machineRepository.find({
        relations: relations,
        where: where || {},
      });
    } catch (err) {
      throw new CustomErrorException(err);
    }
  }

  async update(id: number, updateMachineDto: UpdateMachineDto) {
    try {
      const machine = await this.machineRepository.findOneBy({ id });
      if (!machine) {
        throw new CustomErrorException({
          status: 404,
          message: `No machine found with id ${id}`,
        });
      }

      return this.machineRepository.save({ ...updateMachineDto, id });
    } catch (err) {
      throw new CustomErrorException(err);
    }
  }

  remove(id: number) {
    // TODO: fix cascade delete
    // TODO: missing the enterprise check
    return this.machineRepository.delete({ id });
  }

  count(code: string) {
    return this.machineRepository.count({
      where: {
        enterprise: {
          code: code,
        },
      },
    });
  }
}
