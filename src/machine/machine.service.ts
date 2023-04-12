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
  create(createMachineDto: CreateMachineDto) {
    return this.machineRepository.save(createMachineDto);
  }

  find(query) {
    const { relations, ...where } = query;
    return this.machineRepository.find({
      relations:
        Object.keys(relations).reduce((a, v) => ({ ...a, [v]: true }), {}) ||
        {},
      where: where || {},
    });
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
      return this.machineRepository.update({ id }, updateMachineDto);
    } catch (err) {
      throw new CustomErrorException(err);
    }
  }

  remove(id: number) {
    return this.machineRepository.delete({ id });
  }
}
