import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { CreateMachineDto } from 'src/machine/dto/create-machine.dto';
import { CreatePieceDto } from 'src/piece/dto/create-piece.dto';

export class CreateMachinePieceDto {
  @ApiProperty()
  @IsNumber()
  pieceId: number;
  @ApiProperty()
  @IsNumber()
  machineId: number;
  @ValidateNested({ each: true })
  @Type(() => CreateMachineDto)
  Machine: CreateMachineDto[];
  @ValidateNested({ each: true })
  @Type(() => CreatePieceDto)
  Piece: CreatePieceDto[];
}
