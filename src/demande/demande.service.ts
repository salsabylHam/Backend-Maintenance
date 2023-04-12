import { Injectable } from '@nestjs/common';
import { CreateDemandeDto } from './dto/create-demande.dto';
import { UpdateDemandeDto } from './dto/update-demande.dto';
import { Demande } from './entities/demande.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomErrorException } from 'src/shared/errors/custom-error.exception';

@Injectable()
export class DemandeService {
  constructor(
    @InjectRepository(Demande)
    private demandeRepository: Repository<Demande>,
  ) {}
  create(demande: any) {
    return this.demandeRepository.create(demande);
  }

  find(query: any) {
    const { relations, ...where } = query;
    return this.demandeRepository.find({
      relations:
        Object.keys(relations).reduce((a, v) => ({ ...a, [v]: true }), {}) ||
        {},
      where: where || {},
    });
  }

  async update(id: number, updateDemandeDto: UpdateDemandeDto) {
    try {
      const demande = await this.demandeRepository.findOneBy({ id });
      if (!demande) {
        throw new CustomErrorException({
          status: 404,
          message: `No demande found with id ${id}`,
        });
      }
      return this.demandeRepository.update({ id }, updateDemandeDto);
    } catch (err) {
      throw new CustomErrorException(err);
    }
  }

  remove(id: number) {
    return this.demandeRepository.delete({ id });
  }
}
