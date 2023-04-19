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
import { MachinePiecesService } from './machine-pieces.service';
import { CreateMachinePieceDto } from './dto/create-machine-piece.dto';
import { UpdateMachinePieceDto } from './dto/update-machine-piece.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('machine-pieces')
@Controller('machine-peices')
export class MachinePicesController {
  constructor(private readonly machinePicesService: MachinePiecesService) {}
  @Post()
  create(@Body() createMachineDto: CreateMachinePieceDto) {
    return this.machinePicesService.create(createMachineDto);
  }
  @Get()
  find(@Query() query) {
    return this.machinePicesService.find(query);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateMachinePiceDto: UpdateMachinePieceDto,
  // ) {
  //   return this.machinePicesService.update(+id, updateMachinePiceDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.machinePicesService.remove(+id);
  }
}
