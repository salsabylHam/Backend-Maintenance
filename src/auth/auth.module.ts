import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './stratgies/jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersService,
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
  ],
  providers: [AuthService],
  exports: [JwtModule, JwtStrategy, PassportModule],
  controllers: [AuthController],
})
export class AuthModule {}
