import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SigninDTO } from './dto/Signin.dto';
import { MailService } from 'src/mail/mail.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
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
    const byPass = !(password === '');
    const userData = await this.userService.find(
      {
        email,
        relations: [
          'role',
          'role.rolePermissions',
          'role.rolePermissions.permission',
        ],
      },
      { withPassword: byPass },
    );

    if (
      userData.length == 0 ||
      (byPass && !(await bcrypt.compare(password, userData[0].password)))
    ) {
      throw new UnauthorizedException('Incorrect login credentials!');
    }
    const user = userData.pop();
    delete user.password;
    return user;
  }

  async forgotPassword(data: any) {
    const users = await this.userService.find({ email: data.email });

    if (users.length) {
      const token = this.jwtService.sign({ email: data.email });
      await this.mailService.sendUserForgotPasswordUrl(users[0], token);
      return { status: 'success' };
    } else {
      throw new UnprocessableEntityException('User not found');
    }
  }

  async resetPassword(data: any) {
    try {
      if (!this.jwtService.verify(data.token)) {
        throw new UnprocessableEntityException(
          'Your link has expired please contact your admin to send you a new link',
        );
      }
      const email = this.jwtService.decode(data.token)['email'];
      const user = await this.userService.find({ email });

      if (!user.length) {
        throw new UnprocessableEntityException(
          'No user request to change the password with this link',
        );
      }

      await this.userService.update(
        { email },
        {
          password: bcrypt.hashSync(data.password, 10),
        },
      );
      return { status: 'success' };
    } catch (err) {
      throw new UnprocessableEntityException(err.message);
    }
  }
}
