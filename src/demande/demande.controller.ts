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
}
