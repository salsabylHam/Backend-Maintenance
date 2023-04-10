import { Module } from '@nestjs/common';
import { DamageCodeService } from './damage-code.service';
import { DamageCodeController } from './damage-code.controller';
import { DamageCode } from './entities/damage-code.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DamageCode])],
  controllers: [DamageCodeController],
  providers: [DamageCodeService],
})
export class DamageCodeModule {}
