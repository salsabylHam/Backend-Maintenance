import { Module } from '@nestjs/common';
import { RolePermissionsService } from './role-permissions.service';
import { RolePermission } from './entities/role-permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RolePermission])],
  providers: [RolePermissionsService],
})
export class RolePermissionsModule {}
