import { PartialType } from '@nestjs/mapped-types';
import { CreateMachinePieceDto } from './create-machine-piece.dto';

export class UpdateMachinePieceDto extends PartialType(CreateMachinePieceDto) {}
