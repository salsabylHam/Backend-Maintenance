import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMachineDto {
  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  files: any;
  
  @ApiProperty()
  @IsOptional()
  pieces: any[];

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  price: number;
}
