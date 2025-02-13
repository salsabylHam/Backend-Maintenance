import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Match } from 'src/shared/decorator/match.decorator';
export class EnterpriseDTO {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    address: string;
  }
  
export class SignupDTO {
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  phone: string;

  @IsOptional()
  @IsPhoneNumber()
  @IsString()
  phone2?: string;

  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  )
  password: string;

  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  )
  @Match(SignupDTO, (obj:SignupDTO) => obj.password)
  confirmePassword;

  @ValidateNested()
  @Type(() => EnterpriseDTO)
  enterprise: EnterpriseDTO;
}

