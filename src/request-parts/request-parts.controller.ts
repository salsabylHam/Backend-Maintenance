import {
  Controller,
  Get,
  Put,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RequestPartsService } from './request-parts.service';
import { CreateRequestPartDto } from './dto/create-request-part.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('request-parts')
@UseGuards(AuthGuard('jwt'))
export class RequestPartsController {
  constructor(private readonly requestPartsService: RequestPartsService) {}

  @Put()
  createOrUpdate(
    @Body() createRequestPartDto: CreateRequestPartDto[],
    @Req() req: any,
  ) {
    return this.requestPartsService.createOrUpdate(
      createRequestPartDto,
      req.user,
    );
  }

  @Get()
  findAll() {
    return this.requestPartsService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestPartsService.remove(+id);
  }
}
