import { ValidateNested } from '@nestjs/class-validator';
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

  @IsNumber()
  @IsOptional()
  createOrderBefore: number;

  @IsNumber({}, { each: true })
  @IsOptional()
  orderTechnician: number[];

  @ApiProperty()
  @IsEnum(InterventionType)
  @IsOptional()
  typeOfInterventions: string;

  @ApiProperty()
  @IsEnum(PRIORITY)
  @IsOptional()
  priority: string;

  @ApiProperty()
  @IsEnum(OCCURRENCE)
  @IsOptional()
  occurrence: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  note: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  startDate: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  endDate: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  machineId: number;
}

export class orderBodyDto extends CreateOrderDto {
  @ValidateNested({ each: true })
  @Type(() => CreateOrderDto)
  @IsOptional()
  steps: CreateOrderDto[];
}
