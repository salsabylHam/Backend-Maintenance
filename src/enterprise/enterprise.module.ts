import { Module } from '@nestjs/common';
import { EnterpriseService } from './enterprise.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enterprise } from './entities/enterprise.entity';
import { EnterpriseController } from './enterprise.controller';
import { AuthConfigModule } from 'src/auth-config/auth-config.module';

@Module({
  imports: [TypeOrmModule.forFeature([Enterprise]), AuthConfigModule],
  providers: [EnterpriseService],
  exports: [EnterpriseService],
  controllers: [EnterpriseController],
})
export class EnterpriseModule {}
