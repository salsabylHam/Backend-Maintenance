import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MachinePiecesService } from './machine-pieces.service';
import { CreateMachinePieceDto } from './dto/create-machine-piece.dto';
import { UpdateMachinePieceDto } from './dto/update-machine-piece.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('machine-pices')
@Controller('machine-pices')
export class MachinePicesController {
  constructor(private readonly machinePicesService: MachinePiecesService) {}

  @Post()
  create(@Body() createMachinePiceDto: CreateMachinePieceDto) {
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
  update(
    @Param('id') id: string,
    @Body() updateMachinePiceDto: UpdateMachinePieceDto,
  ) {
    return this.machinePicesService.update(+id, updateMachinePiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.machinePicesService.remove(+id);
  }
}
