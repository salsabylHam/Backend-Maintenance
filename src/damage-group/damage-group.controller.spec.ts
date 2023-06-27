import { Test, TestingModule } from '@nestjs/testing';
import { DamageGroupController } from './damage-group.controller';
import { DamageGroupService } from './damage-group.service';

describe('DamageGroupController', () => {
  let controller: DamageGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DamageGroupController],
      providers: [DamageGroupService],
    }).compile();

    controller = module.get<DamageGroupController>(DamageGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
