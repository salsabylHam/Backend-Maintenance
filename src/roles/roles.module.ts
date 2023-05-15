import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { RolePermissionsModule } from 'src/role-permissions/role-permissions.module';
import { RoleController } from './roles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), RolePermissionsModule],
  providers: [RolesService],
  exports: [RolesService, TypeOrmModule],
  controllers: [RoleController],
})
export class RolesModule {}
