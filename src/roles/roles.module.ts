import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermission } from 'src/role-permissions/entities/role-permission.entity';
import { Role } from './entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, RolePermission])],
  providers: [RolesService],
})
export class RolesModule {}
