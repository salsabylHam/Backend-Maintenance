import { Demande } from 'src/demande/entities/demande.entity';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
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
