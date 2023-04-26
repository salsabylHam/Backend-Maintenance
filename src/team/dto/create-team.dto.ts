import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class TeamUserDto {
  @IsNumber()
  @IsNotEmpty()
  id: string;
}

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => TeamUserDto)
  users: Partial<User>[];
}
