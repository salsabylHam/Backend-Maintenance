import { Test, TestingModule } from '@nestjs/testing';
import { DamageCodeController } from './damage-code.controller';
import { DamageCodeService } from './damage-code.service';

describe('DamageCodeController', () => {
  let controller: DamageCodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DamageCodeController],
      providers: [DamageCodeService],
    }).compile();

    controller = module.get<DamageCodeController>(DamageCodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
