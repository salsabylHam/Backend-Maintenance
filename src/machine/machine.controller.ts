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
  Req,
} from '@nestjs/common';
import { MachineService } from './machine.service';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('machine')
@Controller('machine')
@UseGuards(AuthGuard('jwt'))
export class MachineController {
  constructor(private readonly machineService: MachineService) { }

  @Post()
  create(@Req() req, @Body() createMachineDto: CreateMachineDto) {
    return this.machineService.create(createMachineDto, req.user.enterprise.id);
  }

  @Get()
  find(@Query() query, @Req() req,) {
    const { relations, ...where } = query;
    return this.machineService.find({
      ...where,
      enterprise: { id: req.user.enterprise.id },
      relations
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMachineDto: UpdateMachineDto) {
    return this.machineService.update(+id, updateMachineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.machineService.remove(+id);
  }

  @Get('statistique/count')
  count(@Req() req: any) {
    return this.machineService.count(req.user.enterprise.code);
  }
}
