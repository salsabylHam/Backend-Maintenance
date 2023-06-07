import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DamageGroupService } from './damage-group.service';
import { CreateDamageGroupDto } from './dto/create-damage-group.dto';
import { UpdateDamageGroupDto } from './dto/update-damage-group.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('damage-group')
@Controller('damage-group')
@UseGuards(AuthGuard('jwt'))
export class DamageGroupController {
  constructor(private readonly damageGroupService: DamageGroupService) {}

  @Post()
  create(@Body() createDamageGroupDto: CreateDamageGroupDto) {
    return this.damageGroupService.create(createDamageGroupDto);
  }

  @Get()
  findAll(@Query() query) {
    return this.damageGroupService.find(query);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDamageGroupDto: UpdateDamageGroupDto,
  ) {
    return this.damageGroupService.update(+id, updateDamageGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.damageGroupService.remove(+id);
  }
}
