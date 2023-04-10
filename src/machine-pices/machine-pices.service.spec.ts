import { Test, TestingModule } from '@nestjs/testing';
import { MachinePicesService } from './machine-pices.service';

describe('MachinePicesService', () => {
  let service: MachinePicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MachinePicesService],
    }).compile();

    service = module.get<MachinePicesService>(MachinePicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
