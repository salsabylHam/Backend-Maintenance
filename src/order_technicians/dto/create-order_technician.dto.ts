import { IsDate, IsNumber } from 'class-validator';

export class CreateOrderTechnicianDto {
  @IsNumber()
  technicianId: number;
  @IsDate()
  startDate: Date;
  @IsDate()
  deadLigne: Date;
}
