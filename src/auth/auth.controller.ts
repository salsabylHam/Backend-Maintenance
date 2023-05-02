import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDTO } from './dto/Signin.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signin')
  signIn(@Body() signinDTO: SigninDTO) {
    return this.authService.signIn(signinDTO);
  }

  @Post('forgot-password')
  @ApiBody({ type: [ForgotPasswordDto] })
  forgotPassword(@Body() data: ForgotPasswordDto) {
    return this.authService.forgotPassword(data);
  }

  @Post('reset-password')
  @ApiBody({ type: [ResetPasswordDto] })
  resetPassword(@Body() data: ResetPasswordDto) {
    return this.authService.resetPassword(data);
  }
}
