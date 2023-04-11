import { Test, TestingModule } from '@nestjs/testing';
import { OrderTechniciansService } from './order_technicians.service';

describe('OrderTechniciansService', () => {
  let service: OrderTechniciansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderTechniciansService],
    }).compile();

    service = module.get<OrderTechniciansService>(OrderTechniciansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
