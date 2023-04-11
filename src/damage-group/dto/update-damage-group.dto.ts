import { PartialType } from '@nestjs/swagger';
import { CreateDamageGroupDto } from './create-damage-group.dto';

export class UpdateDamageGroupDto extends PartialType(CreateDamageGroupDto) {}
