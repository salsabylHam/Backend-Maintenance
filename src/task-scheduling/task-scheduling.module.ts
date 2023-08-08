import { Module } from '@nestjs/common';
import { TaskSchedulingService } from './task-scheduling.service';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports: [OrderModule],
  providers: [TaskSchedulingService],
  exports: [TaskSchedulingService],
})
export class TaskSchedulingModule {}
