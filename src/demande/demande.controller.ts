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
import { DemandeService } from './demande.service';
import { CreateDemandeDto } from './dto/create-demande.dto';
import { UpdateDemandeDto } from './dto/update-demande.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('demande')
@Controller('demande')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class DemandeController {
  constructor(private readonly demandeService: DemandeService) {}

  @Post()
  create(@Req() req, @Body() createDemandeDto: CreateDemandeDto) {
    return this.demandeService.create({
      ...createDemandeDto,
      userId: req.user.id,
    });
  }

  @Get()
  find(@Query() query) {
    return this.demandeService.find(query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDemandeDto: UpdateDemandeDto) {
    return this.demandeService.update(+id, updateDemandeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.demandeService.remove(+id);
  }

  @Get('statistique/count')
  count(@Req() req: any) {
    return this.demandeService.count(req.user.enterprise.code);
  }

  @Get('statistique/machine-down-rate')
  machineDownRate(@Req() req: any) {
    return this.demandeService.machineDownRate(req.user.enterprise.code);
  }

  @Get('statistique/increase-rate')
  increaseRate(@Req() req: any) {
    return this.demandeService.increaseRate(req.user.enterprise.code);
  }

  @Get('statistique/by-priority')
  rateByPriority(@Req() req: any) {
    return this.demandeService.rateByPriority(req.user.enterprise.code);
  }

}
