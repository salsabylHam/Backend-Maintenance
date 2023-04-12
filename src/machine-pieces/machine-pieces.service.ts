import { Injectable } from '@nestjs/common';
import { CreateMachinePieceDto } from './dto/create-machine-piece.dto';
import { UpdateMachinePieceDto } from './dto/update-machine-piece.dto';

@Injectable()
export class MachinePiecesService {
  create(createMachinePiceDto: CreateMachinePieceDto) {
    return 'This action adds a new machinePice';
  }

  findAll() {
    return `This action returns all machinePices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} machinePice`;
  }

  update(id: number, updateMachinePiceDto: UpdateMachinePieceDto) {
    return `This action updates a #${id} machinePice`;
  }

  remove(id: number) {
    return `This action removes a #${id} machinePice`;
  }
}
