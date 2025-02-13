import { IsString } from 'class-validator';

export class SigninDTO {
  @IsString()
  password: string;
  @IsString()
  email: string;
  @IsString()
  enterpriseCode: string;
}
