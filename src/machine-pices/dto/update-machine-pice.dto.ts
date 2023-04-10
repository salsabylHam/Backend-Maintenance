import { PartialType } from '@nestjs/mapped-types';
import { CreateMachinePiceDto } from './create-machine-pice.dto';

export class UpdateMachinePiceDto extends PartialType(CreateMachinePiceDto) {}
