import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as _ from 'lodash';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {}

  async create(createTeamDto: CreateTeamDto) {
    return this.teamRepository.save(createTeamDto);
  }

  findAll(query: any) {
    return this.teamRepository.find({
      where: _.omit(query, ['relations']),
      relations: query.relations ?? [],
    });
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return this.teamRepository.save({ id, ...updateTeamDto });
  }

  remove(id: number) {
    return this.teamRepository.delete(id);
  }
}
