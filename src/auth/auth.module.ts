import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './stratgies/jwt.strategy';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { MailModule } from 'src/mail/mail.module';
import { EnterpriseModule } from 'src/enterprise/enterprise.module';
import { RolesModule } from 'src/roles/roles.module';
import { AuthConfigModule } from 'src/auth-config/auth-config.module';
import { AuthProviderService } from './auth-provider.service';

@Module({
  imports: [
    EnterpriseModule,
    MailModule,
    ConfigModule,
    forwardRef(() => UsersModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      global: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
        };
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    RolesModule,
    AuthConfigModule,
  ],
  providers: [AuthService, JwtStrategy, AuthProviderService],
  exports: [JwtModule, JwtStrategy, PassportModule, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
