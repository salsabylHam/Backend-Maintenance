import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DamageCodeService } from './damage-code.service';
import { CreateDamageCodeDto } from './dto/create-damage-code.dto';
import { UpdateDamageCodeDto } from './dto/update-damage-code.dto';

@Controller('damage-code')
export class DamageCodeController {
  constructor(private readonly damageCodeService: DamageCodeService) {}

  @Post()
  create(@Body() createDamageCodeDto: CreateDamageCodeDto) {
    return this.damageCodeService.create(createDamageCodeDto);
  }

  @Get()
  findAll() {
    return this.damageCodeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.damageCodeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDamageCodeDto: UpdateDamageCodeDto) {
    return this.damageCodeService.update(+id, updateDamageCodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.damageCodeService.remove(+id);
  }
}
