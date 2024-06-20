import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateContractDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  scope: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  startDate: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  endDate: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  payment: string;

  @ApiProperty()
  @IsString()
  termination_clause: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  clientId: number;

  @ApiProperty()
  @IsOptional()
  files: any;
}
