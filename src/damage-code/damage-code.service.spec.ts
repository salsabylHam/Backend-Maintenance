import { Test, TestingModule } from '@nestjs/testing';
import { DamageCodeService } from './damage-code.service';

describe('DamageCodeService', () => {
  let service: DamageCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DamageCodeService],
    }).compile();

    service = module.get<DamageCodeService>(DamageCodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
