import { Module } from '@nestjs/common';
import { AuthConfigService } from './auth-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthConfig } from './entities/auth-config.entity';
import { UsersModule } from 'src/users/users.module';
import { EnterpriseModule } from 'src/enterprise/enterprise.module';

@Module({
  imports: [TypeOrmModule.forFeature([AuthConfig])],
  providers: [AuthConfigService],
  exports: [AuthConfigService],
})
export class AuthConfigModule {}
