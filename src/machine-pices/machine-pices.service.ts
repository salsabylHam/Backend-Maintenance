import { Injectable } from '@nestjs/common';
import { CreateMachinePiceDto } from './dto/create-machine-pice.dto';
import { UpdateMachinePiceDto } from './dto/update-machine-pice.dto';

@Injectable()
export class MachinePicesService {
  create(createMachinePiceDto: CreateMachinePiceDto) {
    return 'This action adds a new machinePice';
  }

  findAll() {
    return `This action returns all machinePices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} machinePice`;
  }

  update(id: number, updateMachinePiceDto: UpdateMachinePiceDto) {
    return `This action updates a #${id} machinePice`;
  }

  remove(id: number) {
    return `This action removes a #${id} machinePice`;
  }
}
