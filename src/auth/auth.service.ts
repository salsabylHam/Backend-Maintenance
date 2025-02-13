import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
  Inject,
  forwardRef,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { Auth, AuthBase } from './types/auth.types';
import { SignupDTO } from './dto/Signup.dto';
import { EnterpriseService } from 'src/enterprise/enterprise.service';
import { customAlphabet } from 'nanoid';
import { RolesService } from 'src/roles/roles.service';
import { AuthConfigService } from 'src/auth-config/auth-config.service';
import { AuthConfig } from 'src/auth-config/entities/auth-config.entity';
import { PROVIDERS } from 'src/shared/enums';
import { Enterprise } from 'src/enterprise/entities/enterprise.entity';

const alphabet = '0123456789';
const codeGenrator = customAlphabet(alphabet, 20);
@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly enterpriseService: EnterpriseService,
    private readonly rolesService: RolesService,
    private readonly authConfigService: AuthConfigService,
  ) {}
  async signUp(signupDTO: SignupDTO) {
    const [adminRole, enterprise] = await Promise.all([
      this.rolesService.findAll({
        code: 'ADMIN_ROLE',
      }),
      this.enterpriseService.create<string>({
        name: signupDTO.enterprise.name,
        address: signupDTO.enterprise.address,
        codeGenrator,
      }),
    ]);

    const user = await this.userService.create(
      {
        ...(signupDTO.phone2 ? { phone2: signupDTO.phone2 } : {}),
        firstName: signupDTO.firstName,
        lastName: signupDTO.lastName,
        email: signupDTO.email,
        password: signupDTO.password,
        phone: signupDTO.phone,
        confirmePassword: signupDTO.confirmePassword,
        roleId: adminRole[0].id,
        teams: [],
      },
      enterprise.code,
    );
    await Promise.all([
      this.userService.updateRaw({ id: user.id }, { enterprise: enterprise }),
      this.enterpriseService.update(enterprise.id, {
        owner: user,
      }),
    ]);
    return {
      user,
      enterprise,
    };
  }
  mapProfilToUser(profile: any, config: AuthConfig) {
    // if provider is known then we use the provider mapper
    // else we do out best with the most common known fields
    switch (config.provider) {
      case PROVIDERS.GOOGLE:
        return this.googleProfileMapper(profile, config.enterprise);
      case PROVIDERS.UNKOWN:
        // TODO: swap it to genral mapper
        return this.googleProfileMapper(profile, config.enterprise);
      // return this.genralProfileMapper(profile, config.enterprise);
    }
  }
  //TODO: research on common value used then create a genral mapper
  genralProfileMapper(profile: any, enterprise: Enterprise) {
    throw new Error('Method not implemented.');
  }
  async googleProfileMapper(profile: any, enterprise: Enterprise) {
    // verfiy if user exisit
    const user = await this.verifyUser(
      {
        email: profile.email,
        enterpriseCode: enterprise.code,
      },
      {
        oidcFlow: true,
      },
    );
    if (user != undefined) return user;

    // else create new one
    const role = await this.rolesService.find({
      code: 'TECHNICIANS_ROLE',
    });
    const newUser = {
      firstName: profile.given_name,
      lastName: profile.family_name,
      email: profile.email,
      phone: '',
      password: '',
      confirmePassword: '',

      // we need might create role and team mapper later on from the scopes
      // roleId: adminRole[0].id,
      // teams: [],
      roleId: role[0].id,
      teams: [],
    };
    return this.userService.create(newUser, enterprise.code);
  }

  async getAuthProviderConfig(id: number): Promise<AuthConfig> {
    const authProvider = await this.authConfigService.find({
      id,
      relations: { enterprise: true },
    });

    if (!authProvider) {
      throw new NotFoundException('Auth provider configuration not found');
    }

    await authProvider.setMetaData();

    return authProvider;
  }
  async signIn(
    auth: AuthBase & ({ password: string } | {}),
    options?: {
      oidcFlow: boolean;
    },
  ) {
    const user = await this.verifyUser(auth, options);
    const payload = { email: user.email, sub: user.id };
    return {
      user,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async verifyUser(
    auth: Auth,
    options?: {
      oidcFlow: boolean;
    },
  ) {
    const byPass = 'password' in auth && !(auth.password === '');
    const userData = await this.userService.find(
      {
        email: auth.email,
        enterprise: {
          code: auth.enterpriseCode,
        },
        relations: [
          'enterprise',
          'teams',
          'role',
          'role.rolePermissions',
          'role.rolePermissions.permission',
        ],
      },
      { withPassword: byPass },
    );
    if (options && options.oidcFlow)
      return userData.length == 0 ? undefined : userData[0];
    if (
      userData.length == 0 ||
      (byPass && !(await bcrypt.compare(auth.password, userData[0].password)))
    ) {
      throw new UnauthorizedException('Incorrect login credentials!');
    }
    const user = userData.pop();
    delete user.password;
    return user;
  }

  async forgotPassword(data: AuthBase) {
    const users = await this.userService.find({
      enterpriseCode: data.enterpriseCode,
      enterprise: {
        code: data.enterpriseCode,
      },
      relations: ['enterprise'],
    });

    if (users.length) {
      const token = this.jwtService.sign({
        email: data.email,
        enterpriseCode: data.enterpriseCode,
      });
      await this.mailService.sendUserForgotPasswordUrl(users[0], token);
      return { status: 'success' };
    } else {
      throw new UnprocessableEntityException('User not found');
    }
  }

  async resetPassword(data: { token: string; password: string }) {
    try {
      if (!this.jwtService.verify(data.token)) {
        throw new UnprocessableEntityException(
          'Your link has expired please contact your admin to send you a new link',
        );
      }
      const email = this.jwtService.decode(data.token)['email'];
      const enterpriseCode = this.jwtService.decode(data.token)[
        'enterpriseCode'
      ];
      const user = await this.userService.find({
        email,
        enterprise: {
          code: enterpriseCode,
        },
        relations: ['enterprise'],
      });

      if (!user.length) {
        throw new UnprocessableEntityException(
          'No user request to change the password with this link',
        );
      }

      await this.userService.update(
        { id: user[0].id },
        {
          password: bcrypt.hashSync(data.password, 10),
        },
      );
      return { status: 'success' };
    } catch (err) {
      throw new UnprocessableEntityException(err.message);
    }
  }

  sign(payload: AuthBase) {
    return this.jwtService.sign(payload);
  }
}
