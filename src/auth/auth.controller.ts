import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDTO } from './dto/Signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signin')
  signIn(@Body() signinDTO: SigninDTO) {
    return this.authService.signIn(signinDTO);
  }
}
