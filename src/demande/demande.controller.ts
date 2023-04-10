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
import { DemandeService } from './demande.service';
import { CreateDemandeDto } from './dto/create-demande.dto';
import { UpdateDemandeDto } from './dto/update-demande.dto';

@Controller('demande')
export class DemandeController {
  constructor(private readonly demandeService: DemandeService) {}

  /**
   * TODO: - after adding authentification get user and add it to the create parms
   */
  @Post()
  create(@Body() createDemandeDto: CreateDemandeDto) {
    return this.demandeService.create(createDemandeDto);
  }

  /**
   * TODO: - after adding authentification get user and add it to the querry
   */
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
