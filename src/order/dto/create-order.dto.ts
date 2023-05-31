import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { InterventionType } from 'src/shared/enums/intervention-types.enum';
import { OCCURRENCE } from 'src/shared/enums/occurrence.enum';
import { PRIORITY } from 'src/shared/enums/priority.enums';

export class CreateOrderDto {
  @IsNumber()
  @IsOptional()
  demandeId: number;

  @IsNumber({}, { each: true })
  @IsOptional()
  orderTechnician: number[];

  @ApiProperty()
  @IsEnum(InterventionType)
  typeOfInterventions: string;

  @ApiProperty()
  @IsEnum(PRIORITY)
  priority: string;

  @ApiProperty()
  @IsEnum(OCCURRENCE)
  @IsOptional()
  occurrence: string;

  @ApiProperty()
  @IsString()
  note: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  startDate: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  endDate: string;

  @ApiProperty()
  @IsNumber()
  machineId: number;
}
