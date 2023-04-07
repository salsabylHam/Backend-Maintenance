import { Module } from '@nestjs/common';
import { DamageGroupService } from './damage-group.service';
import { DamageGroupController } from './damage-group.controller';

@Module({
  controllers: [DamageGroupController],
  providers: [DamageGroupService]
})
export class DamageGroupModule {}
