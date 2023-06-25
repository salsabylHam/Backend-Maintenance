import { Test, TestingModule } from '@nestjs/testing';
import { RequestPartsService } from './request-parts.service';

describe('RequestPartsService', () => {
  let service: RequestPartsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestPartsService],
    }).compile();

    service = module.get<RequestPartsService>(RequestPartsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
