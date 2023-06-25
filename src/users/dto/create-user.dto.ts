import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from 'src/shared/decorator/match.decorator';
export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(6)
  @MaxLength(48)
  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Match(CreateUserDto, (user) => user.password)
  confirmePassword: string;

  @ApiProperty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty()
  @IsOptional()
  @IsPhoneNumber()
  phone2: string;

  @ApiProperty()
  @IsString()
  picture: string;

  @ApiProperty()
  @IsOptional()
  roleId: any;

  @ApiProperty()
  @IsOptional()
  teams: any[];
}
