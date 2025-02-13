import { IsString, IsNotEmpty, Matches } from 'class-validator';
import { Match } from 'src/shared/decorator/match.decorator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  token: string;
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  )
  password: string;
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  )
  @Match(ResetPasswordDto, (obj) => obj.password)
  confirmPassword: string;
}
