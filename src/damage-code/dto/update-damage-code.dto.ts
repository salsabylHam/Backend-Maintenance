import { PartialType } from '@nestjs/mapped-types';
import { CreateDamageCodeDto } from './create-damage-code.dto';

export class UpdateDamageCodeDto extends PartialType(CreateDamageCodeDto) {}
