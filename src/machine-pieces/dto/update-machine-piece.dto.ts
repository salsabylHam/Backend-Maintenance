import { PartialType } from '@nestjs/swagger';
import { CreateMachinePieceDto } from './create-machine-piece.dto';

export class UpdateMachinePieceDto extends PartialType(CreateMachinePieceDto) {}
