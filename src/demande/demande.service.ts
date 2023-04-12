import { Injectable } from '@nestjs/common';
import { CreateDemandeDto } from './dto/create-demande.dto';
import { UpdateDemandeDto } from './dto/update-demande.dto';
import { Demande } from './entities/demande.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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

  update(id: number, updateDemandeDto: UpdateDemandeDto) {
    return this.demandeRepository.update({ id }, updateDemandeDto);
  }

  remove(id: number) {
    return this.demandeRepository.delete({ id });
  }
}
