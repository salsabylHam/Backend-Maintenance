import { Module } from '@nestjs/common';
import { DamageCodeService } from './damage-code.service';
import { DamageCodeController } from './damage-code.controller';

@Module({
  controllers: [DamageCodeController],
  providers: [DamageCodeService]
})
export class DamageCodeModule {}
