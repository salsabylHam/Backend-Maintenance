import { Module } from '@nestjs/common';
import { LeaveAbsenceRequestService } from './leave-absence-request.service';
import { LeaveAbsenceRequestController } from './leave-absence-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveAbsenceRequest } from './entities/leave-absence-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LeaveAbsenceRequest])],
  controllers: [LeaveAbsenceRequestController],
  providers: [LeaveAbsenceRequestService],
  exports: [LeaveAbsenceRequestService, TypeOrmModule],
})
export class LeaveAbsenceRequestModule {}
