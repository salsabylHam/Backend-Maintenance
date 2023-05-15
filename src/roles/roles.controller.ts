import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';

@Controller('roles')
@ApiTags('roles')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class RoleController {
  constructor(private readonly roleService: RolesService) {}

  @Get()
  findAll(@Query() query: any) {
    return this.roleService.findAll(query);
  }
}
