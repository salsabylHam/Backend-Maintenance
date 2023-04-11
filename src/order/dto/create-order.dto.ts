import { Type } from 'class-transformer';
import { IsNumber, ValidateNested } from 'class-validator';
import { CreateOrderTechnicianDto } from 'src/order_technicians/dto/create-order_technician.dto';

export class CreateOrderDto {
  @IsNumber()
  demandeId: number;
  @ValidateNested({ each: true })
  @Type(() => CreateOrderTechnicianDto)
  orderTechnichans: CreateOrderTechnicianDto[];
}
