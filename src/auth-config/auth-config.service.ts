import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthConfig } from './entities/auth-config.entity';
import { CustomErrorException } from 'src/shared/errors/custom-error.exception';
import { CreateAuthConfigDTO } from './dto/create-auth-config.dto';
import { Enterprise } from 'src/enterprise/entities/enterprise.entity';

@Injectable()
export class AuthConfigService {
  constructor(
    @InjectRepository(AuthConfig)
    private readonly authConfigRepository: Repository<AuthConfig>,
  ) {}

  async create(authConfig: CreateAuthConfigDTO, enterprise: Enterprise) {
    return this.authConfigRepository.save({
      ...authConfig,
      enterprise: enterprise,
    });
  }
  findAll(query: any, fields?: any) {
    try {
      const { relations, ...where } = query;
      return this.authConfigRepository.find({
        select: fields || undefined,
        relations: !!relations
          ? Object.keys(relations).reduce((a, v) => ({ ...a, [v]: true }), {})
          : {},
        where: where || {},
      });
    } catch (err) {
      throw new CustomErrorException(err);
    }
  }
  find(query: any) {
    try {
      const { relations, ...where } = query;
      return this.authConfigRepository.findOne({
        relations: !!relations
          ? Object.keys(relations).reduce((a, v) => ({ ...a, [v]: true }), {})
          : {},
        where: where || {},
      });
    } catch (err) {
      throw new CustomErrorException(err);
    }
  }
}
