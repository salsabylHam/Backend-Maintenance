import { PartialType } from '@nestjs/swagger';
import { CreateDamageCodeDto } from './create-damage-code.dto';

export class UpdateDamageCodeDto extends PartialType(CreateDamageCodeDto) {}
