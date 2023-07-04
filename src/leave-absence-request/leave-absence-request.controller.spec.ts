import { Test, TestingModule } from '@nestjs/testing';
import { LeaveAbsenceRequestController } from './leave-absence-request.controller';
import { LeaveAbsenceRequestService } from './leave-absence-request.service';

describe('LeaveAbsenceRequestController', () => {
  let controller: LeaveAbsenceRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeaveAbsenceRequestController],
      providers: [LeaveAbsenceRequestService],
    }).compile();

    controller = module.get<LeaveAbsenceRequestController>(LeaveAbsenceRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
