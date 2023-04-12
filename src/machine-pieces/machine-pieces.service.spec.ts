import { Test, TestingModule } from '@nestjs/testing';
import { MachinePiecesService } from './machine-pieces.service';

describe('MachinePicesService', () => {
  let service: MachinePiecesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MachinePiecesService],
    }).compile();

    service = module.get<MachinePiecesService>(MachinePiecesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
