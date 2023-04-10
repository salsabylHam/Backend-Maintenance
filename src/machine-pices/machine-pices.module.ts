import { Module } from '@nestjs/common';
import { MachinePicesService } from './machine-pices.service';
import { MachinePicesController } from './machine-pices.controller';

@Module({
  controllers: [MachinePicesController],
  providers: [MachinePicesService]
})
export class MachinePicesModule {}
