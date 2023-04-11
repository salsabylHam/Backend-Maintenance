import { Test, TestingModule } from '@nestjs/testing';
import { OrderTechniciansController } from './order_technicians.controller';
import { OrderTechniciansService } from './order_technicians.service';

describe('OrderTechniciansController', () => {
  let controller: OrderTechniciansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderTechniciansController],
      providers: [OrderTechniciansService],
    }).compile();

    controller = module.get<OrderTechniciansController>(OrderTechniciansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
