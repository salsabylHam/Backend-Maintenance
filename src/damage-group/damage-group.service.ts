import { Injectable } from '@nestjs/common';
import { CreateDamageGroupDto } from './dto/create-damage-group.dto';
import { UpdateDamageGroupDto } from './dto/update-damage-group.dto';

@Injectable()
export class DamageGroupService {
  create(createDamageGroupDto: CreateDamageGroupDto) {
    return 'This action adds a new damageGroup';
  }

  findAll() {
    return `This action returns all damageGroup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} damageGroup`;
  }

  update(id: number, updateDamageGroupDto: UpdateDamageGroupDto) {
    return `This action updates a #${id} damageGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} damageGroup`;
  }
}
