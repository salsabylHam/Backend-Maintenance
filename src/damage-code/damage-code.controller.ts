import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DamageCodeService } from './damage-code.service';
import { CreateDamageCodeDto } from './dto/create-damage-code.dto';
import { UpdateDamageCodeDto } from './dto/update-damage-code.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('damage-code')
@Controller('damage-code')
export class DamageCodeController {
  constructor(private readonly damageCodeService: DamageCodeService) {}

  @Post()
  create(@Body() createDamageCodeDto: CreateDamageCodeDto) {
    return this.damageCodeService.create(createDamageCodeDto);
  }

  @Get()
  findAll(@Query() query) {
    return this.damageCodeService.find(query);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDamageCodeDto: UpdateDamageCodeDto,
  ) {
    return this.damageCodeService.update(+id, updateDamageCodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.damageCodeService.remove(+id);
  }
}
