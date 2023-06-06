import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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
}
