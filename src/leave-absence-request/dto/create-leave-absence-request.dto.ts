import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNumber, IsString } from 'class-validator';
import { EVENT_TYPE } from 'src/shared/enums/event-type.enums';
export class CreateLeaveAbsenceRequestDto {
  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  @IsEnum(EVENT_TYPE)
  type: string;

  @ApiProperty()
  @IsString()
  startDate: string;

  @ApiProperty()
  @IsString()
  endDate: string;

  @ApiProperty()
  @IsArray()
  technicianId: number[];
}
