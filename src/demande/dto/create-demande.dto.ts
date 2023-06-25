import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { PRIORITY } from 'src/shared/enums/priority.enums';

export class CreateDemandeDto {
  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  files: any;

  @ApiProperty()
  @IsNumber()
  damageGroupId: number;

  @ApiProperty()
  @IsNumber()
  damageCodeId: number;

  @ApiProperty()
  @IsString()
  typeOfInterventions: string;

  @ApiProperty()
  @IsEnum(PRIORITY)
  priority: string;

  @ApiProperty()
  @IsString()
  note: string;

  @ApiProperty()
  @IsNumber()
  machineId: number;
}
