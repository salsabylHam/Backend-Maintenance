import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { PRIORITY } from 'src/shared/enums/priority.enums';
import { REQUEST_PARTS_STATUS } from 'src/shared/enums/request-parts-status.enum';

export class CreateRequestPartDto {
  @IsNumber()
  orderId: number;

  @IsNumber()
  userId: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  qty: number;

  @ApiProperty()
  @IsEnum(REQUEST_PARTS_STATUS)
  status: string;

  @ApiProperty()
  @IsEnum(PRIORITY)
  urgencyLevel: string;
}
