import { Injectable } from '@nestjs/common';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Machine } from './entities/machine.entity';
import { Repository } from 'typeorm';

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

  update(id: number, updateMachineDto: UpdateMachineDto) {
    return this.machineRepository.update({ id }, updateMachineDto);
  }

  remove(id: number) {
    return this.machineRepository.delete({ id });
  }
}
