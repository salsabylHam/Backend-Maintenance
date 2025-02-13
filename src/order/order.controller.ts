import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Request,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { orderBodyDto } from './dto/create-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('order')
@Controller('order')
@UseGuards(AuthGuard('jwt'))
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: orderBodyDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  find(@Query() query, @Request() req: any) {
    return this.orderService.find(query, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }

  @Get('statistique/count')
  count(@Req() req: any) {
    return this.orderService.count(req.user.enterprise.code);
  }

  @Get('statistique/increase-rate')
  increateRate(@Req() req: any) {
    return this.orderService.increaseRate(req.user.enterprise.code);
  }
}
