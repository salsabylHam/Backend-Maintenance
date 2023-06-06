import { Test, TestingModule } from '@nestjs/testing';
import { OrderTechnicianPiecesService } from './order-technician-pieces.service';

describe('OrderTechnicianPiecesService', () => {
  let service: OrderTechnicianPiecesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderTechnicianPiecesService],
    }).compile();

    service = module.get<OrderTechnicianPiecesService>(OrderTechnicianPiecesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
