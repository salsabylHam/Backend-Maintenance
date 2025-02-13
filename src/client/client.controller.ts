import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('clients')
@Controller('clients')
@UseGuards(AuthGuard('jwt'))
export class ClientController {
  constructor(private readonly clientService: ClientService) { }

  @Post()
  create(@Body() createClientDto: CreateClientDto, @Req() req: any) {
    return this.clientService.create(createClientDto, req.user.enterprise.id);
  }

  @Get()
  findAll(@Query() query, @Req() req: any) {
    return this.clientService.findAll(query,req.user.enterprise.id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}
