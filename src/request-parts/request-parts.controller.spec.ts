import { Test, TestingModule } from '@nestjs/testing';
import { RequestPartsController } from './request-parts.controller';
import { RequestPartsService } from './request-parts.service';

describe('RequestPartsController', () => {
  let controller: RequestPartsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestPartsController],
      providers: [RequestPartsService],
    }).compile();

    controller = module.get<RequestPartsController>(RequestPartsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
