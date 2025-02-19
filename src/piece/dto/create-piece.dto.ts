import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
export class CreatePieceDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  discription: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  code: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;
  @ApiProperty()
  @IsOptional()
  files: any;
}
