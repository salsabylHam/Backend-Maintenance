import { Test, TestingModule } from '@nestjs/testing';
import { MachinePicesController } from './machine-pices.controller';
import { MachinePicesService } from './machine-pices.service';

describe('MachinePicesController', () => {
  let controller: MachinePicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MachinePicesController],
      providers: [MachinePicesService],
    }).compile();

    controller = module.get<MachinePicesController>(MachinePicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
