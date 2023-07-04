import { Test, TestingModule } from '@nestjs/testing';
import { LeaveAbsenceRequestService } from './leave-absence-request.service';

describe('LeaveAbsenceRequestService', () => {
  let service: LeaveAbsenceRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeaveAbsenceRequestService],
    }).compile();

    service = module.get<LeaveAbsenceRequestService>(
      LeaveAbsenceRequestService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
