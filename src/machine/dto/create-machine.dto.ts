import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateMachineDto {
  @ApiProperty()
  @IsString()
  description: string;
}
