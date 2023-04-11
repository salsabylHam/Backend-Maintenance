import { IsEnum, IsNumber, IsString } from 'class-validator';
import { PRIORITY } from 'src/shaire/enums/priority.enums';

export class CreateDemandeDto {
  @IsString()
  description: string;
  @IsString()
  image: string;
  @IsNumber()
  damageGroupId: number;
  @IsNumber()
  damageCodeId: number;
  @IsString()
  typeOfInterventions: string;
  @IsEnum(PRIORITY)
  priority: string;
  @IsString()
  note: string;
  @IsNumber()
  machineId: number;
}
