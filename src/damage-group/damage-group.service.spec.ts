import { Test, TestingModule } from '@nestjs/testing';
import { DamageGroupService } from './damage-group.service';

describe('DamageGroupService', () => {
  let service: DamageGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DamageGroupService],
    }).compile();

    service = module.get<DamageGroupService>(DamageGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
