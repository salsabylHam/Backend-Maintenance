import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Demande } from 'src/demande/entities/demande.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id: number;
  @ApiProperty()
  email: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  demandes: Demande[];
}
