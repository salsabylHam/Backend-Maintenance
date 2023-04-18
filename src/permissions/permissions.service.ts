import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomErrorException } from 'src/shared/errors/custom-error.exception';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private PermissionsRepository: Repository<Permission>,
  ) {}

  find(query?: any): Promise<Permission[]> {
    try {
      const { relations, ...where } = query;

      return this.PermissionsRepository.find({
        relations: Object.keys(relations || {}).reduce(
          (a, v) => ({ ...a, [v]: true }),
          {},
        ),
        where: where || {},
      });
    } catch (error) {
      throw new CustomErrorException(error);
    }
  }
}
