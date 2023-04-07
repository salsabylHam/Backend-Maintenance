import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DamageGroupService } from './damage-group.service';
import { CreateDamageGroupDto } from './dto/create-damage-group.dto';
import { UpdateDamageGroupDto } from './dto/update-damage-group.dto';

@Controller('damage-group')
export class DamageGroupController {
  constructor(private readonly damageGroupService: DamageGroupService) {}

  @Post()
  create(@Body() createDamageGroupDto: CreateDamageGroupDto) {
    return this.damageGroupService.create(createDamageGroupDto);
  }

  @Get()
  findAll() {
    return this.damageGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.damageGroupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDamageGroupDto: UpdateDamageGroupDto) {
    return this.damageGroupService.update(+id, updateDamageGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.damageGroupService.remove(+id);
  }
}
