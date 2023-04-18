import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateRolePermissionDto {
  @IsNotEmpty()
  @IsBoolean()
  read: boolean;

  @IsNotEmpty()
  @IsBoolean()
  create: boolean;

  @IsNotEmpty()
  @IsBoolean()
  update: boolean;

  @IsNotEmpty()
  @IsBoolean()
  delete: boolean;
}
