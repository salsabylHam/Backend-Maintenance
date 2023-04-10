import { Module } from '@nestjs/common';
import { MachinePicesService } from './machine-pices.service';
import { MachinePicesController } from './machine-pices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MachinePice } from './entities/machine-pice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MachinePice])],
  controllers: [MachinePicesController],
  providers: [MachinePicesService],
})
export class MachinePicesModule {}
