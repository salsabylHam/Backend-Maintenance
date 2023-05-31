import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

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
}
