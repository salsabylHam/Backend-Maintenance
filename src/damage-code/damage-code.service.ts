import { Injectable } from '@nestjs/common';
import { CreateDamageCodeDto } from './dto/create-damage-code.dto';
import { UpdateDamageCodeDto } from './dto/update-damage-code.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DamageCode } from './entities/damage-code.entity';
import { Repository } from 'typeorm';
import { CustomErrorException } from 'src/shared/errors/custom-error.exception';

@Injectable()
export class DamageCodeService {
  constructor(
    @InjectRepository(DamageCode)
    private damageCodeRepository: Repository<DamageCode>,
  ) {}
  create(createDamageCodeDto: CreateDamageCodeDto) {
    try {
      return this.damageCodeRepository.save(createDamageCodeDto);
    } catch (err) {
      throw new CustomErrorException(err);
    }
  }

  find(query) {
    try {
      const { relations, ...where } = query;
      return this.damageCodeRepository.find({
        relations: !!relations
          ? Object.keys(relations).reduce((a, v) => ({ ...a, [v]: true }), {})
          : {},
        where: where || {},
      });
    } catch (err) {
      throw new CustomErrorException(err);
    }
  }

  async update(id: number, updateDamageCodeDto: UpdateDamageCodeDto) {
    try {
      const damageCode = await this.damageCodeRepository.findOneBy({ id });
      if (!damageCode) {
        throw new CustomErrorException({
          status: 404,
          message: `No damageCode found with id ${id}`,
        });
      }
      return this.damageCodeRepository.update(id, updateDamageCodeDto);
    } catch (err) {
      throw new CustomErrorException(err);
    }
  }

  remove(id: number) {
    return this.damageCodeRepository.delete(id);
  }
}
