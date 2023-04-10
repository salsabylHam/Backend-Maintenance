import { Module } from '@nestjs/common';
import { DamageGroupService } from './damage-group.service';
import { DamageGroupController } from './damage-group.controller';
import { DamageGroup } from './entities/damage-group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DamageGroup])],
  controllers: [DamageGroupController],
  providers: [DamageGroupService],
})
export class DamageGroupModule {}
