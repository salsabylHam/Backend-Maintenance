import { Injectable } from '@nestjs/common';
import { CreateDamageCodeDto } from './dto/create-damage-code.dto';
import { UpdateDamageCodeDto } from './dto/update-damage-code.dto';

@Injectable()
export class DamageCodeService {
  create(createDamageCodeDto: CreateDamageCodeDto) {
    return 'This action adds a new damageCode';
  }

  findAll() {
    return `This action returns all damageCode`;
  }

  findOne(id: number) {
    return `This action returns a #${id} damageCode`;
  }

  update(id: number, updateDamageCodeDto: UpdateDamageCodeDto) {
    return `This action updates a #${id} damageCode`;
  }

  remove(id: number) {
    return `This action removes a #${id} damageCode`;
  }
}
