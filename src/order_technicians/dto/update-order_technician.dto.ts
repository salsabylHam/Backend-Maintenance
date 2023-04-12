import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderTechnicianDto } from './create-order_technician.dto';

export class UpdateOrderTechnicianDto extends PartialType(CreateOrderTechnicianDto) {}
