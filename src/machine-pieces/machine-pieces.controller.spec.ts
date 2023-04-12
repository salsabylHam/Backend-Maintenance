import { Test, TestingModule } from '@nestjs/testing';
import { MachinePicesController } from './machine-pieces.controller';
import { MachinePiecesService } from './machine-pieces.service';

describe('MachinePicesController', () => {
  let controller: MachinePicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MachinePicesController],
      providers: [MachinePiecesService],
    }).compile();

    controller = module.get<MachinePicesController>(MachinePicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
