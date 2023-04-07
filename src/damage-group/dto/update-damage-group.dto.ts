import { PartialType } from '@nestjs/mapped-types';
import { CreateDamageGroupDto } from './create-damage-group.dto';

export class UpdateDamageGroupDto extends PartialType(CreateDamageGroupDto) {}
