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
import { OrderTechniciansService } from './order_technicians.service';
import { UpdateOrderTechnicianDto } from './dto/update-order_technician.dto';

@Controller('order-technicians')
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
