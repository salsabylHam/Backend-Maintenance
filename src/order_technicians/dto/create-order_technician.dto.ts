import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ORDER_STATUS } from 'src/shared/enums/order-status.enum';

export class CreateOrderTechnicianDto {
  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsOptional()
  @IsArray()
  files: any[];

  @IsArray()
  pieces: any[];

  @IsNumber()
  userId: number;

  @IsNumber()
  orderId: number;

  @IsString()
  note: string;

  @IsEnum(ORDER_STATUS)
  status: string;
}
