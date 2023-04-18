import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateRolePermissionDto } from 'src/role-permissions/dto/create-role-permission.dto';

export class CreateRoleDTO {
  @IsNumber()
  @IsNotEmpty()
  idUser: number;

  @IsString()
  @IsNotEmpty()
  label: string;

  @IsNumber()
  @IsNotEmpty()
  idPermission: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateRolePermissionDto)
  permission: CreateRolePermissionDto;
}
