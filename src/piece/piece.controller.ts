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
} from '@nestjs/common';
import { PieceService } from './piece.service';
import { CreatePieceDto } from './dto/create-piece.dto';
import { UpdatePieceDto } from './dto/update-piece.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('piece')
@Controller('piece')
@UseGuards(AuthGuard('jwt'))
export class PieceController {
  constructor(private readonly pieceService: PieceService) {}

  @Post()
  create(@Body() createPieceDto: CreatePieceDto) {
    return this.pieceService.create(createPieceDto);
  }

  @Get()
  findAll(@Query() query) {
    return this.pieceService.find(query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePieceDto: UpdatePieceDto) {
    return this.pieceService.update(+id, updatePieceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pieceService.remove(+id);
  }
}
