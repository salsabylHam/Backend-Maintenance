import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SigninDTO } from './dto/Signin.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn({ email, password }: SigninDTO) {
    const user = await this.verifyUser({ email, password });
    const payload = { email: email, sub: user.id };
    return {
      user,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async verifyUser({ email, password }) {
    const userData = await this.userService.find(
      { email },
      { withPassword: true },
    );

    if (
      userData.length == 0 ||
      !(await bcrypt.compare(password, userData[0].password))
    ) {
      throw new UnauthorizedException('Incorrect login credentials!');
    }
    const user = userData.pop();
    delete user.password;
    return user;
  }
}
