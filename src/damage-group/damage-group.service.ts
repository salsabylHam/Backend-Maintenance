import { Injectable } from '@nestjs/common';
import { CreateDamageGroupDto } from './dto/create-damage-group.dto';
import { UpdateDamageGroupDto } from './dto/update-damage-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DamageGroup } from './entities/damage-group.entity';
import { Repository } from 'typeorm';
import { CustomErrorException } from 'src/shared/errors/custom-error.exception';

@Injectable()
export class DamageGroupService {
  constructor(
    @InjectRepository(DamageGroup)
    private damageGroupRepository: Repository<DamageGroup>,
  ) {}
  create(createDamageGroupDto: CreateDamageGroupDto) {
    return this.damageGroupRepository.save(createDamageGroupDto);
  }

  find(query) {
    const { relations, ...where } = query;
    return this.damageGroupRepository.find({
      relations: relations || {},
      where: where || {},
    });
  }

  async update(id: number, updateDamageGroupDto: UpdateDamageGroupDto) {
    try {
      const damageGroup = await this.damageGroupRepository.findOneBy({ id });
      if (!damageGroup) {
        throw new CustomErrorException({
          status: 404,
          message: `No damageGroup found with id ${id}`,
        });
      }
      return this.damageGroupRepository.update(id, updateDamageGroupDto);
    } catch (err) {
      throw new CustomErrorException(err);
    }
  }

  remove(id: number) {
    return this.damageGroupRepository.delete(id);
  }
}
