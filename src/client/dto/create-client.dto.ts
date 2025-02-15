import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClientDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString({ each: true })
  type: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  contact: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  personnel: string;

  @ApiProperty()
  @IsNotEmpty()
  logo: any;

  @ApiProperty()
  @IsOptional()
  files: any;
}
