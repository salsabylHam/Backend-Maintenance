import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateRoleDTO } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { In, Repository } from 'typeorm';
import { RolePermission } from 'src/role-permissions/entities/role-permission.entity';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(RolePermission)
    private readonly permissionRoleRepo: Repository<RolePermission>,
  ) {}

  async createRole(createRoleDTO: CreateRoleDTO) {
    try {
      const roleExist = await this.roleRepository.findOne({
        where: { label: createRoleDTO.label },
      });
      if (!roleExist) {
        const role = this.roleRepository.create({
          label: createRoleDTO.label,
        });
        await this.roleRepository.save(role);
        await this.permissionRoleRepo.save({
          ...createRoleDTO.permission,
          idRole: role.id,
          idPermission: createRoleDTO.idPermission,
        });
        return role.id;
      } else {
        throw new UnprocessableEntityException('Role name exist');
      }
    } catch (error) {
      return new UnprocessableEntityException(error.message);
    }
  }

  async find(query?: any) {
    return await this.roleRepository.find({
      where: { userId: In(query.userId) } || {},
      relations: query.relations || {},
    });
  }

  async findAll(query?: any): Promise<Role[]> {
    return this.roleRepository.find({
      where: query || {},
    });
  }
  async updateRole(id: number, updateRoleDTO: UpdateRoleDto) {
    try {
      const role = await this.roleRepository.findOne({ where: { id: id } });
      if (role && role.userId === updateRoleDTO.userId) {
        const permissionRole = await this.permissionRoleRepo.findOne({
          where: { idRole: role.id, idPermission: updateRoleDTO.idPermission },
        });
        if (permissionRole) {
          const updatedPermissionRole = Object.assign(
            permissionRole,
            updateRoleDTO.permission,
          );
          await this.permissionRoleRepo.save(updatedPermissionRole);
          return this.roleRepository.update(id, { label: updateRoleDTO.label });
        } else {
          throw new NotFoundException(`Permission with id not found`);
        }
      } else {
        throw new NotFoundException(`Role with id not found`);
      }
    } catch (error) {
      return new UnprocessableEntityException(error.message);
    }
  }
  async deleteRole(id: number, idPermission: number) {
    try {
      const role = await this.roleRepository.findOne({ where: { id: id } });
      if (role) {
        const permissionRole = await this.permissionRoleRepo.findOne({
          where: { idRole: role.id, idPermission: idPermission },
        });
        if (permissionRole) {
          await this.permissionRoleRepo.delete({
            id: permissionRole.id,
          });
          return await this.roleRepository.delete(id);
        } else {
          throw new NotFoundException(`Permission with id not found`);
        }
      } else {
        throw new NotFoundException(`Role with id not found`);
      }
    } catch (error) {
      return new UnprocessableEntityException(error.message);
    }
  }
}
