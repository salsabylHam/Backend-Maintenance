import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MachinePicesService } from './machine-pices.service';
import { CreateMachinePiceDto } from './dto/create-machine-pice.dto';
import { UpdateMachinePiceDto } from './dto/update-machine-pice.dto';

@Controller('machine-pices')
export class MachinePicesController {
  constructor(private readonly machinePicesService: MachinePicesService) {}

  @Post()
  create(@Body() createMachinePiceDto: CreateMachinePiceDto) {
    return this.machinePicesService.create(createMachinePiceDto);
  }

  @Get()
  findAll() {
    return this.machinePicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.machinePicesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMachinePiceDto: UpdateMachinePiceDto) {
    return this.machinePicesService.update(+id, updateMachinePiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.machinePicesService.remove(+id);
  }
}
