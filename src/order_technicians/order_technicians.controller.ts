import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrderTechniciansService } from './order_technicians.service';
import { UpdateOrderTechnicianDto } from './dto/update-order_technician.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('order-technicians')
@Controller('order-technicians')
@UseGuards(AuthGuard('jwt'))
export class OrderTechniciansController {
  constructor(
    private readonly orderTechniciansService: OrderTechniciansService,
  ) {}

  @Get()
  find(@Query() query) {
    return this.orderTechniciansService.find(query);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderTechnicianDto: UpdateOrderTechnicianDto,
  ) {
    return this.orderTechniciansService.update(+id, updateOrderTechnicianDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderTechniciansService.remove(+id);
  }
}
